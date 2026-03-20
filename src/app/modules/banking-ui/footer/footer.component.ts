import { Component } from '@angular/core';

@Component({
    selector: 'banking-footer',
    standalone: false,
    templateUrl: './footer.component.html',
    styleUrl: './footer.component.scss',
})
export class FooterComponent {
    public readonly links: ReadonlyArray<string> = [
        'Вклады',
        'Текущее состояние',
        'Калькулятор',
    ];
}
