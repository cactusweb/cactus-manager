import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpService } from 'src/app/services/http/http.service';

@Component({
  selector: 'app-drop-gen',
  templateUrl: './drop-gen.component.html',
  styleUrls: ['./drop-gen.component.scss']
})
export class DropGenComponent implements OnInit {
  @Output() close = new EventEmitter();
  @Output() addDrop = new EventEmitter<any>();

  dropForm: FormGroup;

  successMessage: string = '';
  errorMessage: string = '';
  rolesString: string = '';



  constructor(
    private http: HttpService,
    
  ) { }

  ngOnInit(): void {
    this.generateForm();  
  }

  generateForm(){
    this.dropForm = new FormGroup({
      quantity: new FormControl( { value: '', disabled: false }, [Validators.required, Validators.pattern('[0-9]*')] ),
      licenseQuantity: new FormControl( { value: '', disabled: false }, [Validators.required, Validators.pattern('[0-9]*')] ),
      price: new FormControl( { value: '', disabled: false }, [Validators.required, Validators.pattern('[0-9]*')] ),
      password: new FormControl( { value: '', disabled: false }, [Validators.required] ),
      time: new FormControl( { value: '', disabled: false }, [Validators.required] ),
      roles: new FormControl( { value: [], disabled: false } )
    })
  }

  async onAddDrop(){
    this.successMessage = '';
    this.errorMessage = '';

    if ( this.dropForm.invalid || this.rolesString == ''){
      this.errorMessage = 'Заполните поля верно!';
      return;
    }

    this.dropForm.value.roles = this.getRolesArr( this.rolesString )

    await this.http.postDrop( this.dropForm.value )
      .then( (w: any) => {
        this.successMessage = 'Successfull added';
        this.addDrop.emit( w._doc );
      })
      .catch( e => {
        this.errorMessage = e.error;
      })
  }

  getRolesArr( rolesString: string ){
    return rolesString.split( ' ' ).join( '' ).split(',');
  }

  onClose(){
    this.close.emit();
  }

}
