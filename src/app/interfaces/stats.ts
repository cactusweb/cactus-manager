import { MonthlyStats } from './monthly-stats';

export interface Stats {
    avg_license_cost: number,
    currency: string,
    expected_income: number,
    keys_total: number,
    renewal_keys: number,
    lifetime_keys: number,
    monthly_stats: MonthlyStats[]
}
