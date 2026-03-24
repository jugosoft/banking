import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BankingUiModule } from './modules/banking-ui/banking-ui.module';
import { select, Store } from '@ngrx/store';
import { MaterialModule } from './modules/material/material.module';
import { selectIsSubmiting } from './modules/auth/store/auth.selectors';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [BankingUiModule, RouterModule, CommonModule, MaterialModule],
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent {
    public readonly isSubmitting = inject(Store).pipe(select(selectIsSubmiting));
}