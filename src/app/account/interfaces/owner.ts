import { DsRole } from "src/app/tools/interfaces/ds-role"

export interface Owner {
    id: string,

    
    uploads: {
        avatar: string
    }

    referral: {
        enabled: boolean,
        price: number,
        plan: string
    }

    general: {
        site_url: string,
        primary_color: string,
        email: string,
        name: string,
    }

    discord: {
        id: string,
        roles: DsRole[]
    },

    payment: {
        kick: boolean,
        way: string,
        currency: string,
        tinkoff: {
            terminal_key: string,
            password: string,
        },
        ameria: {
            merchant_id: string,
            merchant_username: string,
            merchant_password: string,
        },
        details: {
            cards: string[],
            phones: string[]
        }
    }
}
