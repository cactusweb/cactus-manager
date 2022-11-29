export interface Log {
    id: string
    owner: string
    who: whoRes
    action: string
    when: number
    key: string
    details: string
}

interface whoRes{
    name: string
    avatar: string
}