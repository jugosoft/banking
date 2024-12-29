import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'banking-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  public readonly navigation: ReadonlyArray<string> = [
    'Вклады',
    'Текущее состояние',
    'Калькулятор',
  ];
}
