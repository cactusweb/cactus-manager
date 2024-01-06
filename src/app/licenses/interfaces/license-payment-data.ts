export interface LicensePaymentData {
    price: number
    stripe_price_id: string;
    stripe_sub_id: string;
    currency: string
    last_4: string
    timeout: number
    email: string
    exp_date: string,
    customer_id: string,
}
