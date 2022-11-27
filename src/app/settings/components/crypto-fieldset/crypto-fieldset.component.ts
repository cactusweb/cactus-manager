import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { of, take } from 'rxjs';
import { Owner } from 'src/app/account/interfaces/owner';
import { AccountService } from 'src/app/account/services/account.service';
import { CryptoPaymentMethod } from 'src/app/tools/interfaces/crypto-payment-method';
import { ToolsService } from 'src/app/tools/services/tools.service';
import { MethodControl } from './interfaces/method-control';
import { MethodData } from './interfaces/method-data';
import { PaymentMethodsService } from './services/payment-methods.service';

@Component({
  selector: 'app-crypto-fieldset',
  templateUrl: './crypto-fieldset.component.html',
  styleUrls: ['./crypto-fieldset.component.scss']
})
export class CryptoFieldsetComponent implements OnInit {
  methodControls: MethodControl[]|undefined;

  preInitValue: {id: string, address: string}[] = [];

  // methods: CryptoPaymentMethod[] = [
  //   {
  //     id: 1,
  //     network: 'BSC (BEP20)',
  //     coin: {
  //       image: 'https://s3.coinmarketcap.com/static/img/portraits/62da512ff192d82df80012bb.png',
  //       name: 'BUSD',
  //       fullname: 'Binance USD'
  //     }
  //   },
  //   {
  //     id: 2,
  //     network: 'SOL',
  //     coin: {
  //       image: 'https://cdn-icons-png.flaticon.com/512/6001/6001527.png',
  //       name: 'SOL',
  //       fullname: 'Solana'
  //     }
  //   },
  //   {
  //     id: 3,
  //     network: 'ERC20',
  //     coin: {
  //       image: 'https://d33wubrfki0l68.cloudfront.net/f9bf7321ed7d9045fac8e374993c9420fe730b45/121d3/static/6b935ac0e6194247347855dc3d328e83/13c43/eth-diamond-black.png',
  //       name: 'ETH',
  //       fullname: 'Ethereum'
  //     }
  //   },
  // ]

  constructor(
    private tools: ToolsService,
    private http: PaymentMethodsService
  ) {}

  ngOnInit(): void {
  }

  
  public validate(){
    let valid = true;

    if ( !this.methodControls ) return false;

    if ( !this.atLeastOneEnabled() ){
      this.tools.generateNotification('At least one payment method must be enabled', 'err')
      return false;
    }

    this.methodControls.forEach(m => {
      let val: MethodData = m.control.value;
      if ( val.address && val.enabled || !val.enabled ) return;
      this.tools.generateNotification(`Set wallet address for *${m.coin.name}* payment method`, 'err')
      valid = false;
    })

    return valid
  }

  private atLeastOneEnabled(){
    return this.methodControls && this.methodControls.map(d => (d.control.value as MethodData)).filter(d => d.enabled).length > 0
  }
  
  // @ts-ignore
  get _form(): Record<string, any>{
    if ( !this.methodControls ) return this.preInitValue

    return this.methodControls
      .filter(v => {
        let val = (v.control.value as MethodData)
        return (val.enabled && val.address)
      })
      .map(d => {
        return {
          id: d.id,
          address: (d.control.value as MethodData).address
        }
      })
  }

  set _form(owner: Owner){
    this.preInitValue = owner.payment.crypto;
    this.http.getMethods()
      .pipe(take(1))
      .subscribe(methods => {
        this.methodControls = methods.map(m => {
          let val = owner.payment.crypto.find(c => c.id == m.id);
          let data: MethodData = { enabled: !!val, address: val?.address||'' } 
          return {
            ...m,
            control: new FormControl( data, Validators.required )
          }
        })
      })
      
  }


}
