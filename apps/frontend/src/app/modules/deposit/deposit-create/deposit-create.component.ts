import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { Store } from '@ngrx/store';

/**
 * Компонент создания инвест-продукта
 */
@Component({
  selector: 'banking-deposit',
  templateUrl: './deposit-create.component.html',
  styleUrl: './deposit-create.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DepositCreateComponent implements OnInit {
  private readonly store = inject(Store);

  public ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
}
