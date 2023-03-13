import { CryptoPaymentMethod } from 'src/app/tools/interfaces/crypto-payment-method';

export interface TxInfo {
  tx: string;
  type: CryptoPaymentMethod;
  referredBy: {
    username: string;
    avatar: string;
    key: string;
  };
}
