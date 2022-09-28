import { Activations } from "./activations"
import { LicenseDsData } from "./license-ds-data"
import { LicensePaymentData } from "./license-payment-data"
import { Referral } from "./referral"
import { User } from "./user"

export interface License {
  id: string
  user: User | null
//   owner: ownerRes | null
  expires_in: number
  key: string
  unbindable: boolean
  activations: Activations
  type: 'renewal' | 'lifetime' | 'trial' | 'trial-renewal'
  payment: LicensePaymentData
  discord: LicenseDsData
  created_at: number
  bought_at: number
  description: string
  referral: Referral | null
}
