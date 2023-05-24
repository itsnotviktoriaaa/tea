import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shortProductDescription'
})
export class ShortProductDescriptionPipe implements PipeTransform {

  transform(value: string): string {
    return value.length > 95? value.substring(0, 95) + '...' : value;
  }

}
