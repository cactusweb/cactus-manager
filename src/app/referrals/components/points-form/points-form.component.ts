import { Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { finalize, take, tap } from 'rxjs';
import { License } from 'src/app/licenses/interfaces/license';
import { LicensesService } from 'src/app/licenses/services/licenses.service';

@Component({
  selector: 'app-points-form',
  templateUrl: './points-form.component.html',
  styleUrls: ['./points-form.component.scss']
})
export class PointsFormComponent implements OnInit {
  @Output() onClose = new EventEmitter();
  @Input() license!: License
  
  loading: boolean = false;
  form!: FormGroup


  constructor(
    private licenses: LicensesService
  ) { }

  ngOnInit(): void {
    this.generateForm();
  }

  

  @HostListener('document:keydown.escape', ['$event'])
  onEscape(e: KeyboardEvent){
    this.onClose.emit();
  }

  generateForm(){
    this.form = new FormGroup({
      score: new FormControl(this.license.referral?.score||0, Validators.required)
    })
  }

  onSubmit(){
    this.form.markAllAsTouched();

    if ( this.form.invalid ) return;
    
    this.loading = true;

    this.licenses.changeReferralScore( this.license.id, this.form.value['score'] )
      .pipe(
        take(1),
        finalize(() => this.loading = false)
      )
      .subscribe({
        error: () => {}
      })
  }
}
