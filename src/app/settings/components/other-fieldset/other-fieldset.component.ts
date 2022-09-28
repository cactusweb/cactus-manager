import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-other-fieldset',
  templateUrl: './other-fieldset.component.html',
  styleUrls: ['./other-fieldset.component.scss']
})
export class OtherFieldsetComponent implements OnInit {
  botInviteUrl = environment.dsBotInvite;
  showPassForm: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  onInvite(){
    window.open(this.botInviteUrl, '_blank')?.focus();
  }

}
