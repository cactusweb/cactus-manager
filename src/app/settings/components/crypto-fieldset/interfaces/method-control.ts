import { FormControl } from "@angular/forms";
import { CryptoPaymentMethod } from "src/app/tools/interfaces/crypto-payment-method";

export interface MethodControl extends CryptoPaymentMethod{
    control: FormControl
}