// Supabase Configuration
// Replace these with your actual Supabase project credentials
const SUPABASE_URL = 'https://your-project-ref.supabase.co'
const SUPABASE_ANON_KEY = 'your-anon-key'

// Import Supabase client from CDN
import { createClient } from 'https://cdn.skypack.dev/@supabase/supabase-js@2'

// Create and export Supabase client
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

// Database table names
export const TABLES = {
  USERS: 'users',
  GARDENS: 'gardens',
  SUBMISSIONS: 'submissions',
  CARBON_CREDITS: 'carbon_credits',
  TRANSACTIONS: 'transactions',
  NOTIFICATIONS: 'notifications'
}

// Storage bucket names
export const STORAGE_BUCKETS = {
  GARDEN_IMAGES: 'garden-images',
  VERIFICATION_DOCS: 'verification-documents'
}

// Database schema SQL for reference
export const DATABASE_SCHEMA = `
-- Enable Row Level Security
ALTER DATABASE postgres SET "app.jwt_secret" TO 'your-jwt-secret';

-- Users table (extends Supabase auth.users)
CREATE TABLE public.users (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  role TEXT CHECK (role IN ('garden_owner', 'ngo')) NOT NULL,
  organization_name TEXT,
  phone TEXT,
  address JSONB,
  verification_status TEXT DEFAULT 'pending' CHECK (verification_status IN ('pending', 'approved', 'rejected')),
  verification_document_url TEXT,
  total_earnings DECIMAL(10,2) DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Gardens table
CREATE TABLE public.gardens (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  owner_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  location JSONB NOT NULL, -- {address, latitude, longitude}
  garden_type TEXT NOT NULL CHECK (garden_type IN ('residential', 'community', 'commercial')),
  size_sqm DECIMAL(10,2),
  image_urls TEXT[],
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'inactive')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Submissions table
CREATE TABLE public.submissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  garden_id UUID REFERENCES public.gardens(id) ON DELETE CASCADE,
  submitter_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  tree_count INTEGER NOT NULL,
  tree_types JSONB, -- [{name, count, age_years, diameter_cm}]
  estimated_co2_offset DECIMAL(10,3),
  verification_photos TEXT[],
  additional_data JSONB,
  status TEXT DEFAULT 'submitted' CHECK (status IN ('submitted', 'under_review', 'approved', 'rejected')),
  reviewer_notes TEXT,
  submitted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  reviewed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Carbon Credits table
CREATE TABLE public.carbon_credits (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  submission_id UUID REFERENCES public.submissions(id) ON DELETE CASCADE,
  owner_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  credit_amount DECIMAL(10,3) NOT NULL, -- in tonnes CO2
  price_per_tonne DECIMAL(10,2) NOT NULL,
  total_value DECIMAL(10,2) NOT NULL,
  status TEXT DEFAULT 'available' CHECK (status IN ('available', 'sold', 'reserved')),
  certificate_url TEXT,
  issued_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  expires_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Transactions table
CREATE TABLE public.transactions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  credit_id UUID REFERENCES public.carbon_credits(id),
  seller_id UUID REFERENCES public.users(id),
  buyer_id UUID REFERENCES public.users(id),
  amount DECIMAL(10,2) NOT NULL,
  transaction_type TEXT CHECK (transaction_type IN ('sale', 'withdrawal', 'fee')) NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'failed')) NOT NULL,
  payment_method TEXT,
  payment_reference TEXT,
  fees DECIMAL(10,2) DEFAULT 0,
  net_amount DECIMAL(10,2),
  processed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Notifications table
CREATE TABLE public.notifications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  type TEXT CHECK (type IN ('success', 'warning', 'info', 'error')) NOT NULL,
  related_id UUID, -- Can reference submission, transaction, etc.
  read_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_users_role ON public.users(role);
CREATE INDEX idx_gardens_owner ON public.gardens(owner_id);
CREATE INDEX idx_submissions_garden ON public.submissions(garden_id);
CREATE INDEX idx_submissions_status ON public.submissions(status);
CREATE INDEX idx_carbon_credits_owner ON public.carbon_credits(owner_id);
CREATE INDEX idx_carbon_credits_status ON public.carbon_credits(status);
CREATE INDEX idx_transactions_seller ON public.transactions(seller_id);
CREATE INDEX idx_transactions_buyer ON public.transactions(buyer_id);
CREATE INDEX idx_notifications_user ON public.notifications(user_id);

-- Enable Row Level Security
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gardens ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.carbon_credits ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

-- RLS Policies
-- Users can only see and update their own data
CREATE POLICY "Users can view own profile" ON public.users FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON public.users FOR UPDATE USING (auth.uid() = id);

-- Gardens policies
CREATE POLICY "Garden owners can view own gardens" ON public.gardens FOR SELECT USING (auth.uid() = owner_id);
CREATE POLICY "Garden owners can create gardens" ON public.gardens FOR INSERT WITH CHECK (auth.uid() = owner_id);
CREATE POLICY "Garden owners can update own gardens" ON public.gardens FOR UPDATE USING (auth.uid() = owner_id);

-- Submissions policies
CREATE POLICY "Users can view own submissions" ON public.submissions FOR SELECT USING (auth.uid() = submitter_id);
CREATE POLICY "Users can create submissions" ON public.submissions FOR INSERT WITH CHECK (auth.uid() = submitter_id);

-- Carbon credits policies
CREATE POLICY "Users can view own credits" ON public.carbon_credits FOR SELECT USING (auth.uid() = owner_id);

-- Transactions policies
CREATE POLICY "Users can view own transactions" ON public.transactions 
  FOR SELECT USING (auth.uid() = seller_id OR auth.uid() = buyer_id);

-- Notifications policies
CREATE POLICY "Users can view own notifications" ON public.notifications FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update own notifications" ON public.notifications FOR UPDATE USING (auth.uid() = user_id);

-- Create storage buckets
INSERT INTO storage.buckets (id, name, public) VALUES 
  ('garden-images', 'garden-images', true),
  ('verification-documents', 'verification-documents', false);

-- Storage policies
CREATE POLICY "Users can upload garden images" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'garden-images');
CREATE POLICY "Users can view garden images" ON storage.objects FOR SELECT USING (bucket_id = 'garden-images');
CREATE POLICY "Users can upload verification docs" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'verification-documents' AND auth.uid()::text = (storage.foldername(name))[1]);
CREATE POLICY "Users can view own verification docs" ON storage.objects FOR SELECT USING (bucket_id = 'verification-documents' AND auth.uid()::text = (storage.foldername(name))[1]);
`;