import { License } from 'src/app/licenses/interfaces/license';
import { req } from 'src/app/tools/interfaces/req-map';

export const NFT_REFRESH_METADATA_REQUEST: req = {
  url: '/license/:param/nft/refresh-metadata',
  method: 'GET',
};

export interface NftRefreshMetadataDTO {
  status: NftRefreshMetadataStatuses;
  reason: NftRefreshMetadataReasons;
  license: License;
}

export enum NftRefreshMetadataStatuses {
  DELETED = 'deleted',
  UPDATED = 'updated',
}

export enum NftRefreshMetadataReasons {
  BLOCKED = 'blocked',
  FROZEN = 'frozen',
}
