export interface CryptoPaymentMethod{
    id: string,
    network: string,
    coin: Coin
}

interface Coin{
    name: string,
    fullname: string,
    image: string
}