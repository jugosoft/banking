import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'rubFormat',
  standalone: true
})
export class RubFormatPipe implements PipeTransform {
  transform(value: number | string | null | undefined, options?: { symbol?: boolean; digits?: string }): string {
    if (value == null || value === '') {
      return '0 ₽';
    }

    const numValue = typeof value === 'string' ? parseFloat(value) : value;
    if (isNaN(numValue)) {
      return '0 ₽';
    }

    const symbol = options?.symbol !== false;
    const digits = options?.digits ?? '1.0-0';

    const formattedNumber = numValue.toLocaleString('ru-RU', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2
    });

    return symbol ? `${formattedNumber} ₽` : formattedNumber;
  }
}
