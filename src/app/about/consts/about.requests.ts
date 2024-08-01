import { req } from 'src/app/tools/interfaces/req-map';

enum AboutRequestsNames {
  GET = 'GET',
  PUT = 'PUT',
}

export const AboutRequests: Record<AboutRequestsNames, req> = {
  [AboutRequestsNames.GET]: {
    url: '/about',
    method: 'GET',
  },
  [AboutRequestsNames.PUT]: {
    url: '/about',
    method: 'PUT',
  },
};
