import { Pipe, PipeTransform } from '@angular/core';
import { SearchParam } from '../interfaces/search-param';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(arr: any[], keyParams: string[][], searchParam: any): any[] {

    let filter = arr.filter(el => {
      let valid: boolean = false;

      for ( let i = 0; i < keyParams.length; i++ ){
        let filteredParam: any;
        for ( let j = 0; j < keyParams[i].length; j++ ){
          if ( j > 0 && !filteredParam ) break;
          if ( j == 0 ) filteredParam = el[keyParams[i][j]]
          else filteredParam = filteredParam[keyParams[i][j]]
        }
        if ( !filteredParam ) continue;
        
        valid = String(filteredParam).toLowerCase().indexOf( String(searchParam).toLowerCase() ) == 0 || searchParam === filteredParam;
        if ( valid ) break;
      }

      return valid;
    })

    return filter;
  }

}
