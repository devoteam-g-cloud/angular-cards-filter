import { Pipe, PipeTransform } from '@angular/core';
const { isArray } = Array;

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  transform(cards: any[], find: string): any[] {
    if(!cards) return [];
    if(!find) return cards;
    find = find.trim().toLowerCase();
    return search( cards, find);
   }
}

function search(entries: any[], filterValue: string) {

  filterValue = filterValue.toLowerCase();

  return entries.filter(function (obj) {
    const keys: string[] = Object.keys(obj);
    return keys.some(function (key) {
      const value = obj[key];
      if (isArray(value)) {
        return value.some(v => {
          return v.toLowerCase().includes(filterValue);
        });
      }
      else if (!isArray(value) && value) {
        return value.toLowerCase().includes(filterValue);
      }
    })
  });
}