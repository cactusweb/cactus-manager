import { ReqMap } from "../tools/interfaces/req-map";

export const Requests: ReqMap  = {
    getLogs: { url: '/log', method: 'GET' },
}

export const logStatuses = [
    { "value": "bind", "display": "Bind" },
    { "value": "unbind", "display": "Unbind" },
    { "value": "renew", "display": "Renew" },
    { "value": "trial-to-renewal", "display": "Trial-to-renewal" },
    { "value": "deleted", "display": "Deleted" },
    { "value": "expired", "display": "Expired" },
    { "value": "trial-expired", "display": "Trial-expired" },
    { "value": "purchase", "display": "Purchase" },
    { "value": "ref-purchase", "display": "Ref-purchase" },
    { "value": "generated", "display": "Generated" },
    { "value": "auto-renew", "display": "Auto-renew" },
    { "value": "renew-failed", "display": "Renew-failed" },
    { "value": "channel-created", "display": "Channel-created" },
    { "value": "card-binding", "display": "Card-binding" },
]