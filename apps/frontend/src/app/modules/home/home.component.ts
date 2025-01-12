import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { Store } from '@ngrx/store';

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

  public ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
}
