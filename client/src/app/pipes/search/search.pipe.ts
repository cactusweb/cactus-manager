import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(arr: any = [], searchKeys: any = [], searchParam: string = ''): unknown {

    if (arr[0] && searchParam !== '' && searchKeys[0]){

      let filter = arr.filter( ell => {
        let isInclude = false;
        searchKeys.forEach(param => {
          if ( ell && ell[param].toLowerCase().toString().indexOf(searchParam.toLowerCase()) === 0){
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
