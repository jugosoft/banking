import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { MaterialModule } from './modules/material/material.module';
import { selectIsSubmiting } from './modules/auth/store/auth.selectors';
import { WrapperComponent } from './modules/banking-ui/wrapper/wrapper.component';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [WrapperComponent, RouterModule, CommonModule, MaterialModule],
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent {
    public readonly isSubmitting = inject(Store).pipe(select(selectIsSubmiting));
}