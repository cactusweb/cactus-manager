import { DsRole } from "src/app/tools/interfaces/ds-role"

export interface Owner {
    id: string

    uploads: {
        avatar: string
    }

    referral: Referral

    general: GeneralInfo

    discord: Discord

    payment: Payment
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
    way: '' | 'Tinkoff' | 'Ameria' | 'Crypto',
    currency: string,
    tinkoff: Tinkoff,
    ameria: Ameria,
    crypto: Crypto[],
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

interface PaymentDetails{
    cards: string[],
    cryptowallets: string[]
}

interface PaymentCalls{
    attempts: number,
    action: 'ticket'|'kick'|'roles',
    role: string|undefined
}