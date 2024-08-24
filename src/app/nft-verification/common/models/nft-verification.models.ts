export interface NftVerificationDTO {
  enabled: boolean;
  mintAddresses: string[];
  collectionSymbol: string | undefined;
  attributesKeys: NftVerificationAttributesKeysDTO | null;
  lt_plan: string;
  rn_plan: string;
}

export interface NftVerificationAttributesKeysDTO {
  licenseTypeKey: string;
  renewalDateKey: string;
  blockedKey?: string;
}
