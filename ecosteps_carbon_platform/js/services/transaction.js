import { supabase, TABLES } from '../config/supabase.js';

export class TransactionService {
  static async createTransaction(transactionData) {
    try {
      const { data, error } = await supabase
        .from(TABLES.TRANSACTIONS)
        .insert({
          credit_id: transactionData.credit_id,
          seller_id: transactionData.seller_id,
          buyer_id: transactionData.buyer_id,
          amount: transactionData.amount,
          transaction_type: transactionData.transaction_type,
          payment_method: transactionData.payment_method,
          payment_reference: transactionData.payment_reference,
          fees: transactionData.fees || 0,
          net_amount: transactionData.amount - (transactionData.fees || 0)
        })
        .select()
        .single();

      if (error) throw error;

      return { data, error: null };
    } catch (error) {
      console.error('Create transaction error:', error);
      return { data: null, error };
    }
  }

  static async getUserTransactions(userId) {
    try {
      const { data, error } = await supabase
        .from(TABLES.TRANSACTIONS)
        .select(`
          *,
          carbon_credits (
            credit_amount,
            submission_id,
            submissions (
              gardens (
                name
              )
            )
          ),
          seller:seller_id (
            full_name
          ),
          buyer:buyer_id (
            full_name
          )
        `)
        .or(`seller_id.eq.${userId},buyer_id.eq.${userId}`)
        .order('created_at', { ascending: false });

      if (error) throw error;

      return { data, error: null };
    } catch (error) {
      console.error('Get user transactions error:', error);
      return { data: null, error };
    }
  }

  static async processTransaction(transactionId) {
    try {
      // Update transaction status
      const { data: transaction, error: transactionError } = await supabase
        .from(TABLES.TRANSACTIONS)
        .update({
          status: 'completed',
          processed_at: new Date().toISOString()
        })
        .eq('id', transactionId)
        .select(`
          *,
          carbon_credits (*)
        `)
        .single();

      if (transactionError) throw transactionError;

      // Update carbon credit status if it's a sale
      if (transaction.transaction_type === 'sale' && transaction.credit_id) {
        const { error: creditError } = await supabase
          .from(TABLES.CARBON_CREDITS)
          .update({ status: 'sold' })
          .eq('id', transaction.credit_id);

        if (creditError) throw creditError;

        // Update seller's earnings
        const { error: earningsError } = await supabase
          .from(TABLES.USERS)
          .update({
            total_earnings: supabase.raw(`total_earnings + ${transaction.net_amount}`)
          })
          .eq('id', transaction.seller_id);

        if (earningsError) throw earningsError;

        // Create notifications
        await this.createTransactionNotifications(transaction);
      }

      return { data: transaction, error: null };
    } catch (error) {
      console.error('Process transaction error:', error);
      return { data: null, error };
    }
  }

  static async createTransactionNotifications(transaction) {
    try {
      // Notification for seller
      await supabase
        .from(TABLES.NOTIFICATIONS)
        .insert({
          user_id: transaction.seller_id,
          title: 'Payment Received',
          message: `You received $${transaction.net_amount} from the sale of your carbon credits.`,
          type: 'success',
          related_id: transaction.id
        });

      // Notification for buyer
      await supabase
        .from(TABLES.NOTIFICATIONS)
        .insert({
          user_id: transaction.buyer_id,
          title: 'Purchase Completed',
          message: `Your purchase of ${transaction.carbon_credits.credit_amount}t CO2 credits has been completed.`,
          type: 'success',
          related_id: transaction.id
        });
    } catch (error) {
      console.error('Create transaction notifications error:', error);
    }
  }

  static async getUserBalance(userId) {
    try {
      const { data: user, error } = await supabase
        .from(TABLES.USERS)
        .select('total_earnings')
        .eq('id', userId)
        .single();

      if (error) throw error;

      // Get pending transactions
      const { data: pendingTransactions } = await supabase
        .from(TABLES.TRANSACTIONS)
        .select('amount')
        .eq('seller_id', userId)
        .eq('status', 'pending')
        .eq('transaction_type', 'withdrawal');

      const pendingAmount = pendingTransactions?.reduce((sum, t) => sum + parseFloat(t.amount), 0) || 0;
      const availableBalance = user.total_earnings - pendingAmount;

      return {
        data: {
          total_earnings: user.total_earnings,
          pending_withdrawals: pendingAmount,
          available_balance: Math.max(0, availableBalance)
        },
        error: null
      };
    } catch (error) {
      console.error('Get user balance error:', error);
      return { data: null, error };
    }
  }

  static async requestWithdrawal(userId, amount, paymentMethod, paymentDetails) {
    try {
      // Check available balance
      const { data: balance } = await this.getUserBalance(userId);
      
      if (!balance || balance.available_balance < amount) {
        throw new Error('Insufficient balance for withdrawal');
      }

      const { data, error } = await supabase
        .from(TABLES.TRANSACTIONS)
        .insert({
          seller_id: userId,
          amount: amount,
          transaction_type: 'withdrawal',
          payment_method: paymentMethod,
          payment_reference: JSON.stringify(paymentDetails),
          fees: amount * 0.03, // 3% processing fee
          net_amount: amount * 0.97
        })
        .select()
        .single();

      if (error) throw error;

      // Create notification
      await supabase
        .from(TABLES.NOTIFICATIONS)
        .insert({
          user_id: userId,
          title: 'Withdrawal Requested',
          message: `Your withdrawal request for $${amount} has been submitted and is being processed.`,
          type: 'info',
          related_id: data.id
        });

      return { data, error: null };
    } catch (error) {
      console.error('Request withdrawal error:', error);
      return { data: null, error };
    }
  }

  static async getTransactionStats(userId) {
    try {
      const { data, error } = await supabase
        .from(TABLES.TRANSACTIONS)
        .select('amount, transaction_type, status, created_at')
        .or(`seller_id.eq.${userId},buyer_id.eq.${userId}`)
        .eq('status', 'completed');

      if (error) throw error;

      const stats = {
        total_sales: 0,
        total_purchases: 0,
        total_withdrawals: 0,
        transaction_count: data.length,
        monthly_earnings: 0
      };

      const currentMonth = new Date().getMonth();
      const currentYear = new Date().getFullYear();

      data.forEach(transaction => {
        const transactionDate = new Date(transaction.created_at);
        const amount = parseFloat(transaction.amount);

        if (transaction.transaction_type === 'sale') {
          stats.total_sales += amount;
          
          if (transactionDate.getMonth() === currentMonth && 
              transactionDate.getFullYear() === currentYear) {
            stats.monthly_earnings += amount;
          }
        } else if (transaction.transaction_type === 'withdrawal') {
          stats.total_withdrawals += amount;
        }
      });

      return { data: stats, error: null };
    } catch (error) {
      console.error('Get transaction stats error:', error);
      return { data: null, error };
    }
  }
}