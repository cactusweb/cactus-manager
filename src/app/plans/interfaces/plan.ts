import { DsRole } from "src/app/tools/interfaces/ds-role"

export interface Plan {
    id: string
    owner: string
    name: string
    unbindable: boolean
    activations: number
    type: 'lifetime' | 'renewal' | 'trial' | 'trial-renewal'
    price: number;
    stripe_price_id: number;
    roles: DsRole[],
    trial_time: number
}
