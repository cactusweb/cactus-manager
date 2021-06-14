import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(arr: any = [], params: any = [], detect: boolean): unknown {


    if (arr[0] && params[0] && this.checkActiveFilters(params)){

      let filter = arr.filter( ell => {
        let isInclude = false;
        params.forEach(param => {
          if ( param.str != '' && param.status && ell[param.key].toLowerCase().toString() == param.str.toLowerCase() ){
            isInclude = true;
            return false;
          }
        });
        return isInclude;

      })
      return filter;

    }

    return arr;
  }

  checkActiveFilters(params: any = []){ 
    let active = false;
    params.forEach(param => {
      if (param.status) { active = true; return false }
    });
    return active;
  }

}
