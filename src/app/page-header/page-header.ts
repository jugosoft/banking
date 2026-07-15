import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs';

@Component({
  selector: 'app-page-header',
  standalone: true,
  templateUrl: './page-header.html',
  styleUrl: './page-header.scss',
})
export class PageHeader {
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  public title = signal('');

  constructor() {
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
}
