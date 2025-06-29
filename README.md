# 🌱 EcoSteps - Carbon Credit Marketplace

EcoSteps is a simple, user-friendly carbon credit marketplace that allows individuals—such as garden or farm owners—to sell carbon credits based on certified carbon intake, and enables NGOs to purchase these credits to offset emissions and support sustainability goals.

---

## 📌 Problem It Solves

🌍 Climate change requires grassroots action. But individual efforts often go unrecognized.

EcoSteps bridges that gap by:
- Providing a platform for individuals to monetize their carbon sequestration efforts (like planting trees).
- Empowering NGOs to transparently invest in verified carbon offsets.
- Simplifying the carbon credit process through a clean, guided application and marketplace.

---

## 🎯 Key Features

### 🔐 Authentication
- Simple login/register system for both Garden Owners and NGOs.
- Supabase integration for secure authentication and database management.

### 🧑‍🌾 Garden Owner (Seller) Side
- Fill a garden submission form including:
  - Location and size of farmland.
  - Number and types of trees planted.
  - Certified carbon intake value (based on a third-party survey).
- Upload certificate proof and images.
- Automatically calculate carbon credits based on intake.
- List carbon credits for sale on the marketplace.
- Track earnings and credit sales via a personal dashboard.

### 🌐 NGO (Buyer) Side
- Browse listed carbon credits with filters (location, price, rating, availability).
- Add credits to cart and checkout.
- Track impact metrics and purchase history via an NGO dashboard.
- View geographic map of supported areas.

### 📊 Marketplace & Analytics
- Real-time credit availability.
- Leaderboards and progress charts.
- Wallet summary and past activity history.

---

## ⚙️ Tech & Tools

- ⚡ Built with modern frontend architecture (Vite + React).
- 🎨 Styled using TailwindCSS.
- 🔗 Backend powered by Supabase (authentication, database, storage).
- 🧠 AI-assisted planning and code-generation using Bolt.new.

---

## 🚧 Challenges We Ran Into

### 🌿 Understanding Carbon Credit Systems
- **Problem:** Researching how carbon credit certification works and how individuals could participate in trading.
- **Solution:** We simplified this by designing a system where certified carbon intake can directly be input, verified with documents, and converted into tradable units.

### ⚙️ Backend Integration with Supabase
- **Problem:** Encountered difficulties while wiring up real-time data sync, database security policies, and conditional rendering based on user roles.
- **Solution:** Modularized the codebase, used Supabase Row-Level Security, and added fallback UI for smoother UX.

### 📈 Market Novelty
- **Problem:** Carbon credit trading at a micro/individual level is a relatively new concept.
- **Solution:** We framed it as a **mission-driven opportunity**, letting individuals earn while healing the planet. Our simple UX ensures people understand the impact easily.

---

## 🚀 How to Run Locally

1. Clone the repo:
   ```bash
   git clone https://github.com/yourusername/ecosteps.git
   cd ecosteps
