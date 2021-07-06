import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { take, tap } from 'rxjs/operators';
import { Requests } from 'src/app/const';
import { HttpService } from 'src/app/services/http/http.service';

@Component({
  selector: 'app-drop-gen',
  templateUrl: './drop-gen.component.html',
  styleUrls: ['./drop-gen.component.scss']
})
export class DropGenComponent implements OnInit {
  // @Output() close = new EventEmitter();
  @Output() onNewItem = new EventEmitter<any>();

  @Output() onClose = new EventEmitter<boolean>();

  @Input() plans: any = [];

  dropForm: FormGroup;

  isError: boolean = true;
  message: string = '';


  constructor(
    private http: HttpService,
    
  ) { }

  ngOnInit(): void {
    this.generateForm();
  }

  generateForm(){
    this.dropForm = new FormGroup({
      quantity: new FormControl( { value: '', disabled: false }, [Validators.required, Validators.pattern('[0-9]*')] ),
      price: new FormControl( { value: 0, disabled: false }, [Validators.required, Validators.pattern('[0-9]*')] ),
      password: new FormControl( { value: '', disabled: false }, [Validators.required] ),
      start_at: new FormControl( { value: new Date().toISOString().slice(0, -8), disabled: false }, [Validators.required] ),
      plan: new FormControl( { value: this.plans[0].id, disabled: false }, Validators.required )
    })
  }

  onAddDrop(){
    this.message = '';

    if ( this.dropForm.invalid ){
      this.message = 'Incorrect filling!';
      this.isError = true;
      return;
    }

    this.dropForm.value.start_at = new Date(this.dropForm.value.start_at);
    this.http.request( Requests.postDrop, this.dropForm.value )
      .pipe( take(1), tap( w => this.onNewItem.emit(w) ) )
      .subscribe( res => handleSuccess(), err => handleError(err) )

    let handleSuccess = () => {
      this.isError = false;
      this.message = 'Successful added';
    }

    let handleError = (err: any) => {
      this.isError = true;
      this.message = err.error.message || err.error.error || err.error;
    }
  }



}
