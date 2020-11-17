import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(arr: any = [], params: any = [], detect: boolean): unknown {
    let activeParams = false;

    params.forEach(param => {
      if (param.status){
        activeParams = true;
        return false;
      }
    });

    if (arr[0] && params[0] && activeParams){

      let filter = arr.filter( ell => {
        let isInclude = false;
        params.forEach(param => {
          if ( param.str != '' && param.status && ell[param.key].toLowerCase().toString().includes(param.str.toLowerCase())){
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

}
