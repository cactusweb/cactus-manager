import { req } from 'src/app/tools/interfaces/req-map';

const enum CommonRequestsNames {
  POST_FILE = 'POST_FILE',
  DELETE_FILE = 'DELETE_FILE',
}

export const CommonRequests: Record<CommonRequestsNames, req> = {
  [CommonRequestsNames.POST_FILE]: {
    url: '/upload',
    method: 'POST',
  },

  [CommonRequestsNames.DELETE_FILE]: {
    url: '/upload',
    method: 'DELETE',
  },
};
