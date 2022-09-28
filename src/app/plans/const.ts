import { ReqMap } from "../tools/interfaces/req-map";

export const Requests: ReqMap  = {
    postPlan: { url: '/plan', method: 'POST' },
    getPlans: { url: '/plan', method: 'GET' },
    deletePlan: { url: '/plan/:param', method: 'DELETE' },
}

export const PlansSpinnerName = 'plansSpinner'
