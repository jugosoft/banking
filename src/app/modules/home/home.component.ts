import {
    Component,
    inject,
    OnInit,
} from '@angular/core';
import { DepositService } from 'src/app/services/api/deposit.service';
import { map, tap } from 'rxjs';

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
    public isLoading = false;
    private readonly depositService = inject(DepositService);
    public deposits$ = this.depositService.getDepositList$().pipe(
        tap(() => this.isLoading = true),
        map(response => response.data?.items ?? []),
        tap(() => this.isLoading = false)
    );

    public ngOnInit(): void {
    }
}

