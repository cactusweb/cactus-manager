import { DsRole } from "src/app/tools/interfaces/ds-role"

export interface Owner {
    id: string,

    email: string,
    name: string,
    
    uploads: {
        avatar: string
    }

    payment_way: string,
    payment_details: {
        cards: string[],
        phones: string[]
    }



    settings: {
        discord: {
            id: string,
            roles: DsRole[]
        },
        site_url: string,
        primary_color: string,
        kick: boolean,
        tinkoff: {
            terminal_key: string,
            password: string,
            currency: string
        },
        ameria: {
            merchant_id: string,
            merchant_username: string,
            merchant_password: string,
            currency: string,
        },
        referral: {
            enabled: boolean,
            price: number,
            plan: string
        }
    }
}
