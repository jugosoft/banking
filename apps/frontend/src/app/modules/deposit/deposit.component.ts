import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

import { Store } from '@ngrx/store';

/**
 * Компонент деталицзации инвест-продукта
 */
@UntilDestroy()
@Component({
  selector: 'banking-deposit',
  templateUrl: './deposit.component.html',
  styleUrl: './deposit.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DepositComponent implements OnInit {
  public id: number | null = null;
  private readonly store = inject(Store);
  private readonly activatedRoute = inject(ActivatedRoute);

  public ngOnInit(): void {
    this.bindRoute();
  }

  private bindRoute(): void {
    this.activatedRoute.params.pipe(untilDestroyed(this)).subscribe({
      next: (params) => {
        this.id = params['id'];
      },
    });
  }
}
