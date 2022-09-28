import { MonthlyStat } from "./monthly-stat";

export interface Stats {
    keys_total: number,
    renewal_keys: number,
    lifetime_keys: number,
    expected_income: number,
    avg_license_cost: number,
    currency: string,
    monthly_stats: MonthlyStat[]
}
