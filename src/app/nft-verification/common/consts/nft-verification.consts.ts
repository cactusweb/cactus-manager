import { req } from 'src/app/tools/interfaces/req-map';

const apiUrl = '/nft-verification';

const enum HttpRequestNames {
  PUT_DATA = 'PUT_DATA',
  GET_DATA = 'GET_DATA',
}

export const NftVerificationRequests: Record<HttpRequestNames, req> = {
  [HttpRequestNames.PUT_DATA]: {
    url: apiUrl,
    method: 'PUT',
  },

  [HttpRequestNames.GET_DATA]: {
    url: '/nft',
    method: 'GET',
  },
};
