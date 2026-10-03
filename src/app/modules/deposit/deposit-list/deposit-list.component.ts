import {
    Component,
    inject,
    OnInit,
} from '@angular/core';
import { DepositService } from 'src/app/services/api/deposit.service';
import { ReferenceService } from 'src/app/services/api/reference.service';
import { IDeposit } from 'src/app/api/deposit';
import { Router } from '@angular/router';
import { AsyncPipe, NgFor } from '@angular/common';
import { finalize, map, Observable, switchMap } from 'rxjs';
import { IDepositListFilter } from '../store/model/deposit-list-filter.interfaces';
import { BaseListComponent } from 'src/app/common/components/base-list.component';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ScrollTriggerDirective } from 'src/app/common/directives/scroll.directive';
import { DepositCardComponent } from '../../shared/deposit-card/deposit-card.component';
import { EmptyState } from '../../home/empty-state/empty-state';
import { CreateButtonComponent } from '../../banking-ui/create-button/create-button.component';

@Component({
    selector: 'app-deposit-list',
    standalone: true,
    imports: [
        AsyncPipe,
        MatChipsModule,
        MatProgressSpinnerModule,
        ScrollTriggerDirective,
        EmptyState,
        DepositCardComponent,
        CreateButtonComponent
    ],
    templateUrl: './deposit-list.component.html',
    styleUrl: './deposit-list.component.scss',
})
export class DepositListComponent extends BaseListComponent<IDeposit, IDepositListFilter> implements OnInit {
    private readonly depositService = inject(DepositService);
    private readonly referenceService = inject(ReferenceService);
    private readonly router = inject(Router);

    public banks$ = this.referenceService.banks$;

    public override filter: IDepositListFilter = {
        actual: true
    };

    public get isFiltered(): boolean {
        const { actual, ...restFilters } = this.filter;
        return !!restFilters;
    }

    public override ngOnInit(): void {
        super.ngOnInit();
    }

    public onCreateDeposit(): void {
        void this.router.navigate(['/deposit', 'create']);
    }

    public selectBank(bankId: number | null): void {
        this.filter = {
            ...this.filter,
            bankId: typeof bankId === 'number' ? [bankId] : [],
        };

        this.loadItems();
    }

    protected override getItems(page: number = 0): Observable<{ items: IDeposit[]; hasMore: boolean; page: number }> {
        return this.depositService.getDepositList$(page, this.pageSize, this.filter).pipe(
            map(response => ({
                items: response.data?.items ?? [],
                hasMore: response.data?.hasMore ?? false,
                page: response.data?.page ?? 0
            })),
        );
    }

    protected override deleteItem(id: number): Observable<boolean> {
        return this.depositService.deleteDeposit$(id);
    }
}
