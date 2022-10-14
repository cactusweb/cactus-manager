import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Stats } from '../../interfaces/stats';

@Component({
  selector: 'app-license-stat',
  templateUrl: './license-stat.component.html',
  styleUrls: ['./license-stat.component.scss']
})
export class LicenseStatComponent implements OnInit, OnChanges {
  stats!: Stats

  @Input('stats') set _stats(val: Stats){
    this.stats = val;
    setTimeout(() => {
      this.buildOpt();
    }, 200);
  }

  opt: any

  constructor() {
  }

  ngOnInit(): void {
    this.buildOpt(true);
  }

  ngOnChanges(changes: SimpleChanges): void {
    // this.buildOpt();

  }


  buildOpt(isNull: boolean = false){
    this.opt = {
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)'
      },series: [
        {
            name: 'Count',
            color: ['#78AFF8', '#45B95899', '#E4AE24', '#E24C4C', '#000000'],
            type: 'pie',
            radius: ['83%', '95%'],
            avoidLabelOverlap: false,
            labelLine: {
              show: false
            },
            data: [
              { name: 'Renewal keys', value: !isNull ? this.stats?.renewal_keys || 0 : 0 },
              { name: 'Lifetime keys', value: !isNull ? this.stats?.lifetime_keys || 0 : 0 },
              { name: 'Trial-renewal keys', value: !isNull ? this.stats?.trial_renewal_keys || 0 : 0 },
              { name: 'Trial keys', value: !isNull ? this.stats?.trial_keys || 0 : 0 },
            ],
            label: {
              show: false,
              position: 'center',
              text: 'fef'
            },
            showEmptyCircle: true,
            emptyCircleStyle: {
              borderColor: '#122',
              borderWidth: 5,
              color: '#129',
              borderType: [5, 10],
              
              borderDashOffset: 5,
              borderCap: 'round',
            },
            backgroundColor: '#000',
            emphasis: {
                itemStyle: {
                    shadowBlur: 0,
                    shadowOffsetX: 0,
                    // shadowColor: 'rgba(0, 0, 0, 0.1)'
                }
            },
            itemStyle: {
              borderRadius: 8,
              borderColor: '#fff',
              borderWidth: 6
          },
        }
      ] 
    }
  }

}
