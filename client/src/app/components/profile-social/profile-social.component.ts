import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-profile-social',
  templateUrl: './profile-social.component.html',
  styleUrls: ['./profile-social.component.scss']
})
export class ProfileSocialComponent implements OnChanges {

  @Input() socials = [
    { name: 'vk', link: 'https://vk.com/cactus_web' },
    { name: 'twitter', link: 'https://twitter.com/cactusSoft_io' },
    { name: '', link: '' }
  ]

  @Output() newValue = new EventEmitter<any>();

  constructor() { }

  ngOnChanges() {

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
