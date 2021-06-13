
import { License } from './license';
import { Plan } from './plan';

export interface Drop {
    id: string,
    license: [License],
    owner: string,
    password: string,
    plan: Plan,
    price: 0,
    start_at: 0,
    status: string,
    url: string,
    quantity: number
}
