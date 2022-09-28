import { ReqMap } from "../tools/interfaces/req-map";

export const Requests: ReqMap  = {
    registr: { url: '/sign-up', method: 'POST', authType: null },
    login: { url: '/sign-in', method: 'POST', authType: null },
}