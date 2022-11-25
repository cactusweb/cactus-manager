export interface CryptoPaymentMethod{
    id: number,
    network: string,
    coin: Coin
}

interface Coin{
    name: string,
    fullname: string,
    image: string
}