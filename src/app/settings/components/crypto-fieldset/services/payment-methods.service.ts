import { Injectable } from '@angular/core';
import { BehaviorSubject, finalize, Observable, of, Subject, tap } from 'rxjs';
import { CryptoPaymentMethod } from 'src/app/tools/interfaces/crypto-payment-method';
import { HttpService } from 'src/app/tools/services/http.service';
import { Requests } from './const';

@Injectable()
export class PaymentMethodsService {
    private methods: CryptoPaymentMethod[]|undefined
    private $methods = new Subject<CryptoPaymentMethod[]>()
    private loading: boolean = false;

    constructor(
        private http: HttpService
    ){

    }


    getMethods(): Observable<CryptoPaymentMethod[]>{
        if ( this.loading )
            return this.$methods.asObservable();

        if ( !this.methods ){
            this.loading = true;
            this.http.request(Requests['getCryptoMethods'])
                .pipe(
                    tap(d => this.methods = d),
                    finalize(() => this.loading = false)
                )
                .subscribe(res => this.$methods.next(res))
            return this.$methods.asObservable();
        }
        
        return of(this.methods)
    }
    
}