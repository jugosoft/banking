import {
    Component,
    inject,
    OnInit,
} from '@angular/core';
import { select, Store } from '@ngrx/store';
import { getDepositList } from './store/home.actions';
import { selectDeposits, selectIsLoading, selectIsSubmiting } from './store/home.selectors';

/**
 * Компонент домашней страницы
 */
@Component({
    selector: 'banking-home',
    standalone: false,
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
    private readonly store = inject(Store);
    public deposits$ = this.store.pipe(select(selectDeposits));
    public isLoading$ = this.store.pipe(select(selectIsLoading));
    public isSubmitting$ = this.store.pipe(select(selectIsSubmiting));

    public ngOnInit(): void {
        this.store.dispatch(getDepositList());
    }
}

