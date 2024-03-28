export interface NftVerificationDTO {
  enabled: boolean;
  mintAddresses: string[];
  collectionSymbol: string | undefined;
  attributesKeys: NftVerificationAttributesKeysDTO;
}

export interface NftVerificationAttributesKeysDTO {
  licenseTypeKey: string;
  renewalDateKey: string;
  blockedKey?: string;
}
