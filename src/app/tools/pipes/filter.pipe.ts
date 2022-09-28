import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
  pure: false
})
export class FilterPipe implements PipeTransform {

  transform(arr: any[], keyParams: string[], searchParams: any[]): any[] {

    if ( searchParams.length == 0 ) return arr;

    let filter = arr.filter(el => {
      let valid: boolean = false;

      let filteredParam: any;
      for ( let j = 0; j < keyParams.length; j++ ){
        if ( j > 0 && !filteredParam ) break;
        if ( j == 0 ) filteredParam = el[keyParams[j]]
        else filteredParam = filteredParam[keyParams[j]]
      }

      if ( !filteredParam ) return valid;

      for ( let i = 0; i < searchParams.length; i++ ){
        valid = searchParams[i] == filteredParam;
        if ( valid ) break;
      }

      return valid;
    })

    return filter;
  }

}
