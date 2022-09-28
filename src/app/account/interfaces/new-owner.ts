import { DsRole } from "src/app/tools/interfaces/ds-role"

export interface NewOwner {
    id: string,
    general: {
        name: string,
        email: string,
        site_url: string,
        primary_color: string
    },
    uploads: {
        avatar: string,
        background: string
    },
    discord: {
        id: string,
        roles: DsRole[]
    },
    payment: {
        currency: string,
        way: "Tinkoff" | "Ameria" | null,
        kick: boolean,
        details: {
            cards: string[],
            phones: string[]
        },
        tinkoff: null | {
            terminal_key: string,
            password: string,
        },
        ameria: null | {
            merchant_id: string,
            merchant_username: string,
            merchant_password: string,
        }
    },
    referral: {
        enabled: boolean,
        price: number,
        plan: string
    }
}
