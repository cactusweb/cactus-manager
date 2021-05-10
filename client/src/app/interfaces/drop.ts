
import { License } from './license';

export interface Drop {
    id: string,
    license: [License],
    owner: string,
    password: string,
    plan: string,
    price: 0,
    start_at: 0,
    status: string,
    url: string,
    quantity: number
}
