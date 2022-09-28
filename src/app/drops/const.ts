import { ReqMap } from "../tools/interfaces/req-map";

export const Requests: ReqMap  = {
    postDrop: { url: '/drop', method: 'POST' },
    getDrops: { url: '/drop', method: 'GET' },
    deleteDrop: { url: '/drop/:param', method: 'DELETE' },
    stopDrop: { url: '/drop/:param/stop', method: 'GET' },
}

export const DropsSpinnerName = 'dropsSpinner'
