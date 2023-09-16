import { Pipe, PipeTransform } from '@angular/core';
import { SortParams } from '../interfaces/sort-params';


@Pipe({
  name: 'sort'
})
export class SortPipe implements PipeTransform {

  transform(arr: any[], sortParams: SortParams, sortType: null | 'ascend' | 'discend'): any[] {
    if ( sortType == null ) return arr;

    let sort = arr.sort((a: any, b: any) => {
      a = this.getFilteredParam(a, sortParams.keys)
      b = this.getFilteredParam(b, sortParams.keys)


      if ( sortParams.type == 'string' ){
        a = a ? a.toLowerCase() : a;
        b = b ? b.toLowerCase() : b;
      }

      if ( a == '' && b !== '' ) return 1
      if ( a !== '' && b == '' ) return -1

      if ( a == b ) return 0;
      if ( a > b ) return sortType == 'ascend' ? 1 : -1
      else return sortType == 'ascend' ? -1 : 1
    })

    console.log(sort)
    return sort;
  }

  getFilteredParam( el: Record<any, any>, keyParams: string[] ){
    let filteredParam: any;
    for ( let j = 0; j < keyParams.length; j++ ){
      if ( j > 0 && !filteredParam ) break;
      if ( j == 0 ) filteredParam = el[keyParams[j]]
      else filteredParam = filteredParam[keyParams[j]]
    }

    return filteredParam;
  }

}
