import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(arr: any = [], param: string, keys: []): unknown {


    if (arr[0] && param){

      let filter = arr.filter( ell => {
        let isInclude = false;
        keys.forEach( key => {
          if (ell[key] && ell[key].toLowerCase().indexOf(param.toLowerCase()) === 0){
            isInclude = true;
            return false;
          }
        })
        return isInclude;
      })

      return filter;
    }

    return arr;
  }

}
