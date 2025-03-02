export type TransactionStatus = 'Pending' | 'In Progress' | 'Completed' | 'Failed';
export type PaymentMethod = 'Bank deposit' | 'Cash pickup' | 'Mobile wallet';
export type Currency = 'USD' | 'MXN' | 'GTQ' | 'ARS';

export interface Transaction {
    transaction_id: string;
    sender_whatsapp: string;
    receiver_whatsapp: string;
    amount_sent: number;
    amount_received: number;
    exchange_rate: number;
    fee: number;
    status: TransactionStatus;
    date: string;
    payment_method: PaymentMethod;
    payment_details?: string;
    currency_sent: Currency;
    currency_received: Currency;
}

export interface TransactionFilters {
    search: string;
    status: TransactionStatus | '';
    startDate: string;
    endDate: string;
    page: number;
    limit: number;
} 