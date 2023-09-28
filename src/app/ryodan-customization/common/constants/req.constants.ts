export type req = {
  url: string;
  method: 'GET' | 'POST' | 'DELETE' | 'PUT';
};

export const RyodanRequests: Record<string, req> = {
  getApplications: {
    url: '/applications',
    method: 'GET',
  },
  putApplication: {
    url: '/applications/:param',
    method: 'PUT',
  },
  deleteApplication: {
    url: '/applications/:param',
    method: 'DELETE',
  },

  getReports: {
    url: '/reports',
    method: 'GET',
  },
  getReportById: {
    url: '/reports/:param',
    method: 'GET',
  },
  putReport: {
    url: '/reports/:param',
    method: 'PUT',
  },
  deleteReport: {
    url: '/reports/:param',
    method: 'DELETE',
  },

  postMetamasks: {
    url: '/metamasks',
    method: 'POST',
  },
  getMetamasks: {
    url: '/metamasks',
    method: 'GET',
  },
  getUserMetamasks: {
    url: '/metamasks/user/:param',
    method: 'GET',
  },
  getRemainingMetamasksCount: {
    url: '/metamasks/remaining',
    method: 'GET',
  },
  deleteMetamask: {
    url: '/metamasks/:param',
    method: 'DELETE',
  },
  deleteUserMetamasks: {
    url: '/metamasks/user/:param',
    method: 'DELETE',
  },
};
