import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize, map, take } from 'rxjs/operators';
import { Requests } from 'src/app/const';
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

  ngOnInit() {
    this.getDrops();
  }

  ngOnChanges(){
    if ( this.loadNow ) this.getDrops()
  }

  closeDropGen(){
    this.isNewDrop = false;
  }

  onDeleteDrop(id){
    this.drops = this.drops.filter( ell => ell.id != id );
  }


  getDrops(){
    this.spinner.show();
    this.loadNow = false;
    this.http.request( Requests.getAllDrop )
      .pipe( take(1), finalize( () => this.spinner.hide() ), map( drops => drops?.reverse() ) )
      .subscribe(
        res => { this.onSuccessLoad.emit(); this.drops = res;}, err => this.onErrorLoad.emit(), () => this.onSuccessLoad.emit()
      )
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
