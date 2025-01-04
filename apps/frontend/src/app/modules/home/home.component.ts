import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { UntilDestroy } from '@ngneat/until-destroy';

/**
 * Компонент домашней страницы
 */
@UntilDestroy()
@Component({
  selector: 'banking-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  private readonly store = inject(Store);
}
