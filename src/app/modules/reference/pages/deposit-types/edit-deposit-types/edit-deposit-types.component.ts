import { Component, inject, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { filter, finalize, switchMap } from 'rxjs';
import { IDepositType } from '@api/deposit-type';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { ReferenceService } from 'src/app/services/api/reference.service';

@UntilDestroy()
@Component({
    selector: 'banking-edit-deposit-types',
    standalone: false,
    templateUrl: './edit-deposit-types.component.html',
    styleUrls: ['./edit-deposit-types.component.scss'],
})
export class EditDepositTypesComponent implements OnInit {
    private readonly referenceService = inject(ReferenceService);
    public isLoading$ = false;
    public depositTypes: IDepositType[] = [];
    public displayedColumns: string[] = ['id', 'name', 'actions'];

    public ngOnInit(): void {
        this.loadDepositTypes();
    }

    public loadDepositTypes(): void {
        this.isLoading$ = true;
        this.referenceService.depositTypes$
            .pipe(
                finalize(() => this.isLoading$ = false),
                untilDestroyed(this)
            )
            .subscribe({
                next: types => this.depositTypes = types
            });
    }

    public onDelete(id: number): void {
        // TODO: Implement delete logic
        console.log('Delete deposit type:', id);
    }

    public onEdit(id: number): void {
        // TODO: Implement edit logic
        console.log('Edit deposit type:', id);
    }

    public onCreate(): void {
        // TODO: Implement create logic
        console.log('Create new deposit type');
    }
}
