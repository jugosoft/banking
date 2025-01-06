import { Component, inject, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BankingUiModule } from './modules/banking-ui/banking-ui.module';
import { Store } from '@ngrx/store';
import { getCurrentUser } from './modules/auth/store/auth.actions';

@Component({
  selector: 'banking-root',
  standalone: true,
  imports: [BankingUiModule, RouterModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  private readonly store = inject(Store);

  public ngOnInit(): void {
    this.store.dispatch(getCurrentUser());
  }
}
