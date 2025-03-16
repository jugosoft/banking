import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BankingUiModule } from './modules/banking-ui/banking-ui.module';
import { select, Store } from '@ngrx/store';
import { getCurrentUser } from './modules/auth/store/auth.actions';
import { MaterialModule } from './modules/material/material.module';
import { selectIsSubmiting } from './modules/auth/store/auth.selectors';

@Component({
  selector: 'banking-root',
  standalone: true,
  imports: [BankingUiModule, RouterModule, CommonModule, MaterialModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  public readonly store = inject(Store);
  public readonly isSubmitting$ = this.store.pipe(select(selectIsSubmiting));

  public ngOnInit(): void {
    this.store.dispatch(getCurrentUser());
  }
}
