import { Plan } from "src/app/plans/interfaces/plan"

export interface Drop {
    id: string
    owner: string
    plan: Plan
    quantity: number
    bought: number
    password: string
    price: number
    currency: string
    url: string,
    status: 'stopped' | 'started' | 'not started'
    start_at: number,
}
