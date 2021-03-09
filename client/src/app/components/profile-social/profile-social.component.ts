import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-profile-social',
  templateUrl: './profile-social.component.html',
  styleUrls: ['./profile-social.component.scss']
})
export class ProfileSocialComponent implements OnChanges {

  @Input() links = []
  socials;

  @Output() newValue = new EventEmitter<any>();

  constructor() { }

  ngOnChanges() {
    if ( !this.socials ){
      this.socials = this.links;
      this.socials?.push({ name: '', link: '' });
    }
  }


  delSocial(i){
    this.socials.splice( i, 1 );
    this.emitData();
  }

  emitData(){
    let socials = this.socials.filter( ell => ell.name && ell.link );
    console.log( socials )
    this.newValue.emit(socials);
  }



}
