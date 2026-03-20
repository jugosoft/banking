import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'notSpecified',
    standalone: false
})
export class NotSpecifiedPipe implements PipeTransform {
    public transform(value: any, placeholder: string = 'Не указано'): string {
        return value ? value.toString() : placeholder;
    }
}
