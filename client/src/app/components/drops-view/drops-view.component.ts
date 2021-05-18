import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from 'src/app/services/auth/auth.service';
import { HttpService } from 'src/app/services/http/http.service';
import { SeoService } from 'src/app/services/seo/seo.service';

@Component({
  selector: 'app-drops-view',
  templateUrl: './drops-view.component.html',
  styleUrls: ['./drops-view.component.scss']
})
export class DropsViewComponent implements OnInit, OnChanges {
  isNewDrop: boolean = false;
  @Input() plans: any;

  @Input() loadNow = false;
  @Output() onErrorLoad = new EventEmitter();
  @Output() onSuccessLoad = new EventEmitter();

  drops;


  constructor(
    private activatedRoute: ActivatedRoute,
    private seo: SeoService,
    private spinner: NgxSpinnerService,
    private http: HttpService,
    private auth: AuthService
  ) { 
    let data: any = this.activatedRoute.data.pipe();
    data = data._value;
    this.seo.changeTitle(data.title);
  }

  async ngOnInit() {
    await this.getDrops();
  }

  async ngOnChanges(){
    console.log( this.loadNow )
    if ( this.loadNow ) await this.getDrops()
  }

  closeDropGen(){
    this.isNewDrop = false;
  }

  onDeleteDrop(id){
    this.drops = this.drops.filter( ell => ell.id != id );
  }


  async getDrops(){
    this.spinner.show();
    this.loadNow = false;
    await this.http.getDrops()
      .then( ( w: any ) => {
        this.drops = w?.reverse();
        this.spinner.hide();
        this.onSuccessLoad.emit();
      })
      .catch( e => {
        this.spinner.hide();
        if ( e.status == 401 )
          this.auth.logout();
        else{
          this.onErrorLoad.emit();
        }

      })
  }

  onNewItem( event ){
    this.drops.unshift( event )
    this.drops = this.drops.map(drop => ({
      ...drop,
    }))
  }

  
  trackByFn(index, item){
    return item.id;
  }


}
