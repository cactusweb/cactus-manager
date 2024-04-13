import { req } from 'src/app/tools/interfaces/req-map';

const API_URL = '/nft-verification';

const enum HttpRequestNames {
  PUT_DATA = 'PUT_DATA',
  GET_DATA = 'GET_DATA',
  SEND_WH = 'SEND_WH',
}

export const NftVerificationRequests: Record<HttpRequestNames, req> = {
  [HttpRequestNames.PUT_DATA]: {
    url: API_URL,
    method: 'PUT',
  },

  [HttpRequestNames.GET_DATA]: {
    url: API_URL,
    method: 'GET',
  },

  [HttpRequestNames.SEND_WH]: {
    url: API_URL + 'ds-webhook',
    method: 'POST',
  },
};
