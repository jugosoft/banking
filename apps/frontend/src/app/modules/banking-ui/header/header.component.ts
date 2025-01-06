import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'banking-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  private readonly router = inject(Router);

  public readonly navigation: ReadonlyArray<string> = [
    'Вклады',
    'Текущее состояние',
    'Калькулятор',
  ];

  public onLoginClick(): void {
    void this.router.navigate(['/auth', 'login']);
  }

  public onRegisterClick(): void {
    void this.router.navigate(['/auth', 'register']);
  }
}
