import { DsRole } from "src/app/tools/interfaces/ds-role"

export interface Owner {
    id: string

    uploads: {
        avatar: string
    }

    referral: Referral

    general: GeneralInfo

    discord: Discord

    payment: Payment,

    additional_activations: AdditionalActivations
}


interface Referral{
    enabled: boolean,
    price: number,
    plan: string
}


interface GeneralInfo{
    site_url: string,
    primary_color: string,
    email: string,
    name: string
}


interface Discord{
    id: string,
    roles: DsRole[]
}


interface Payment{
    way: '' | 'Tinkoff' | 'Ameria' | 'Crypto' | 'Stripe',
    currency: string,
    tinkoff: Tinkoff,
    ameria: Ameria,
    crypto: Crypto[],
    stripe: Stripe,
    details: PaymentDetails
    calls: PaymentCalls
}

interface Tinkoff{
    terminal_key: string,
    password: string
}

interface Ameria{
    merchant_id: string,
    merchant_username: string,
    merchant_password: string
}

interface Crypto{
    id: string,
    address: string
}

interface Stripe{
    secretKey: string,
    webhookSecretKey: string,
}

interface PaymentDetails{
    cards: string[],
    cryptowallets: string[]
}

interface PaymentCalls{
    max_attempts: number,
    action: 'ticket'|'kick'|'roles',
    expires_role: DsRole|undefined,
    wh_content: string
}

interface AdditionalActivations{
    enabled: boolean;
    plans:  AdditionalActivationPlan[],
    limits: AdditionalActivationsLimits
}

export interface AdditionalActivationPlan{
    price: number,
    duration: number|null
}

export interface AdditionalActivationsLimits{
    lifetime: number,
    temporary: number
}