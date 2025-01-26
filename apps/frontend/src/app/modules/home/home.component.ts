import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { select, Store } from '@ngrx/store';

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
  // public deposits$ = this.store.pipe(select());

  public ngOnInit(): void {

  }
}
