import { ReqMap } from "../tools/interfaces/req-map";

export const Requests: ReqMap  = {
    getLogs: { url: '/log', method: 'GET' },
}

export const logStatuses = [
    { "value": "bind", "display": "Bind" },
    { "value": "unbind", "display": "Unbind" },
    { "value": "renew", "display": "Renew" },
    { "value": "deleted", "display": "Deleted" },
    { "value": "expired", "display": "Expired" },
    { "value": "purchase", "display": "Purchase" },
    { "value": "generated", "display": "Generated" },
    { "value": "auto-renew", "display": "Auto-renew" },
    { "value": "renew-failed", "display": "Renew-failed" },
    { "value": "channel-created", "display": "Channel-created" },
    { "value": "card-binding", "display": "Card-binding" }
]