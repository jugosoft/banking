import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs';
import { MatIcon } from "@angular/material/icon";

@Component({
  selector: 'app-page-header',
  standalone: true,
  templateUrl: './page-header.html',
  styleUrl: './page-header.scss',
  imports: [MatIcon],
})
export class PageHeader {
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  public title = signal('');
  public showBackButton = signal(false);

  constructor() {
    // Отслеживаем навигацию для показа кнопки назад
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        map(() => this.router.url),
        map((url) => {
          // Разбиваем URL на части и считаем уровень вложенности
          const parts = url.split('/').filter(part => part.trim() !== '');
          // Не показываем кнопку, если на первом уровне роутинга (0 или 1 часть)
          return parts.length > 1;
        })
      )
      .subscribe((showBack) => {
        this.showBackButton.set(showBack);
      });

    // Устанавливаем заголовок
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        map(() => this.route),
        map((route) => {
          let childRoute = route.firstChild;
          while (childRoute?.firstChild) {
            childRoute = childRoute.firstChild;
          }
          return childRoute?.snapshot.data['title'] || 'Домашняя страница';
        })
      )
      .subscribe((title) => {
        this.title.set(title);
      });
  }

  onBack(): void {
    this.router.navigate(['/']);
  }
}
