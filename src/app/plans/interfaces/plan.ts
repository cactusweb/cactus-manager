import { DsRole } from "src/app/tools/interfaces/ds-role"

export interface Plan {
    id: string
    owner: string
    name: string
    unbindable: boolean
    activations: number
    license_status: 'lifetime' | 'renewal' | 'trial' | 'trial-renewal'
    renewal_price: number
    roles: DsRole[],
    trial_time: number
}
