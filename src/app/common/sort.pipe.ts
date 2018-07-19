import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sort'
})
export class SortPipe implements PipeTransform {

  transform(array: Array<any>, args: string): Array<any> {
    array.sort((a: any, b: any) => {
      if (a.name < b.name) {
        return args !== 'dsc' ? -1 : 1;
      } else if (a.name > b.name) {
        return args !== 'dsc' ? 1 : -1;
      } else {
        return 0;
      }
    });
    return array;
  }
}
