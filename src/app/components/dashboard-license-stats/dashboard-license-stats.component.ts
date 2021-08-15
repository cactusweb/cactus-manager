import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { Stats } from 'src/app/interfaces/stats';

@Component({
  selector: 'app-dashboard-license-stats',
  templateUrl: './dashboard-license-stats.component.html',
  styleUrls: ['./dashboard-license-stats.component.scss']
})
export class DashboardLicenseStatsComponent implements OnInit, OnChanges {
  @Input() stats!: Stats;
  opt: any;

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(){
    if ( !this.stats ) return
    
    this.opt = {
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)'
      },series: [
        {
            name: 'Количество',
            color: ['#6B9BDC', '#344E72', '#000000'],
            type: 'pie',
            radius: ['40%', '70%'],
            avoidLabelOverlap: false,
            labelLine: {
              show: false
            },
            data: [
              { name: 'Renewal keys', value: this.stats?.renewal_keys || 0  },
              { name: 'Lifetime keys', value: this.stats?.lifetime_keys || 0  },
            ],
            label: {
              show: false,
              position: 'center',
              text: 'fef'
            },
            emphasis: {
                itemStyle: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            },
            itemStyle: {
              borderRadius: 10,
              borderColor: '#fff',
              borderWidth: 4
          },
        }
      ] 
    }
  }
}
