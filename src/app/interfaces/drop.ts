
import { License } from './license';
import { Plan } from './plan';

export interface Drop {
    id: string,
    license: [License],
    owner: string,
    password: string,
    plan: Plan,
    price: number,
    start_at: number,
    status: string,
    url: string,
    quantity: number
}
