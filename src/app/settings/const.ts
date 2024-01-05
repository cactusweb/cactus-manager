import { ReqMap } from "../tools/interfaces/req-map";
import { SelectorValue } from "../tools/interfaces/selector-values";

export const Requests: ReqMap  = {
    editSelf: { url: '', method: 'PUT' },
    changePassword: { url: '/password', method: 'PUT' },
    postFile: { url: '/upload/:param', method: 'POST' },
}


export const paymentWays: SelectorValue[] = [
    { value: '', display: 'None' },
    { value: 'Crypto' },
    { value: 'Tinkoff' },
    { value: 'Ameria' },
    { value: 'Stripe' }
] 

export const currencies: SelectorValue[] = [
    { value: 'RUB' },
    { value: 'USD' },
    { value: 'EUR' }
]