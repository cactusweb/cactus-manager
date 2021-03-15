import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sort'
})
export class SortPipe implements PipeTransform {

  transform(arr: [], params: string): unknown {


    let field: string = params.split('-')[0];
    let field2: string = params.split('-')[3];
    let ascend: boolean = params.split('-')[1] === 'true';
    let type: string = params.split('-')[2];


    if ( arr && field ){

      
      arr = arr.sort( (a,b) => {
        let x: any = a[field];
        let y: any = b[field];
        if ( field2 ){
          x = x ? x[field2] : '';
          y = y ? y[field2] : '';
        }
        if ( type == 'date' ){
          x = new Date(x).getTime();
          y = new Date(y).getTime();
        }else
        if ( type == 'string' ) {
          x = new String(x).toLowerCase();
          y = new String(y).toLowerCase();
        }
        let returnParam = 0;
        if ( !x ) returnParam = 1; else
        if ( !y ) returnParam = -1; else
        if ( x > y ) returnParam = ascend ? 1 : -1; else
        if ( x < y ) returnParam = ascend ? -1 : 1;
        return returnParam
      })

    }
    return arr;
  }

}
