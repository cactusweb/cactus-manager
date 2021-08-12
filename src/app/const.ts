
export type req = {
    url: string,
    method: 'GET' | 'POST' | 'DELETE' | 'PUT',
    authType?: null
};

type reqMap = Record< string, req >;

export const Requests: reqMap = {
    // licenses 
    postLicense: { url: '/license', method: 'POST' },
    getAllLicense: { url: '/license', method: 'GET' },
    deleteLicense: { url: '/license/:param', method: 'DELETE' },
    editLicense: { url: '/license/:param', method: 'PUT' },
    renewLicense: { url: '/license/:param/renew', method: 'GET' },

    // profile
    getSelf: { url: '/@me', method: 'GET' },
    editSelf: { url: '', method: 'PUT' },
    changePassword: { url: '/password', method: 'PUT' },

    // files
    postFile: { url: '/upload/:param', method: 'POST' },

    // drops
    postDrop: { url: '/drop', method: 'POST' },
    getAllDrop: { url: '/drop', method: 'GET' },
    deleteDrop: { url: '/drop/:param', method: 'DELETE' },
    stopDrop: { url: '/drop/:param/stop', method: 'GET' },


    // plans
    postPlan: { url: '/plan', method: 'POST' },
    getAllPlan: { url: '/plan', method: 'GET' },
    deletePlan: { url: '/plan/:param', method: 'DELETE' },

    // logs
    getAllLog: { url: '/log', method: 'GET' },

    // auth
    registr: { url: '/sign-up', method: 'POST', authType: null },
    login: { url: '/sign-in', method: 'POST', authType: null },


    // stats
    getStats: { url: '/stats', method: 'GET' }
}
