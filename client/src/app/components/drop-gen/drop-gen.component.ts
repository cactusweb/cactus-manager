import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
    console.log( this.plans )
    this.generateForm();
  }

  generateForm(){
    this.dropForm = new FormGroup({
      quantity: new FormControl( { value: '', disabled: false }, [Validators.required, Validators.pattern('[0-9]*')] ),
      price: new FormControl( { value: '', disabled: false }, [Validators.required, Validators.pattern('[0-9]*')] ),
      password: new FormControl( { value: '', disabled: false }, [Validators.required] ),
      start_at: new FormControl( { value: '', disabled: false }, [Validators.required] ),
      plan: new FormControl( { value: this.plans[0]._id, disabled: false }, Validators.required )
    })
  }

  async onAddDrop(){
    this.message = '';

    if ( this.dropForm.invalid ){
      this.message = 'Incorrect filling!';
      this.isError = true;
      return;
    }

    this.dropForm.value.time = new Date(this.dropForm.value.time);
    await this.http.postDrop( this.dropForm.value )
      .then( (w: any) => {
        this.isError = false;
        this.message = 'Successful added';
        this.onNewItem.emit( w );
      })
      .catch( e => {
        this.isError = true;
        this.message = e.error || e.error.error || e.error.message;
      })
  }



}
