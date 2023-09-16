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
};
