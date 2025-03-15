import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { select, Store } from '@ngrx/store';
import { getDepositList } from './store/home.actions';
import { deposits, isSubmiting } from './store/home.selectors';

/**
 * Компонент домашней страницы
 */
@Component({
  selector: 'banking-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit {
  private readonly store = inject(Store);
  public deposits$ = this.store.pipe(select(deposits));
  public isSubmitting$ = this.store.pipe(select(isSubmiting));

  public ngOnInit(): void {
    this.store.dispatch(getDepositList());
  }
}
