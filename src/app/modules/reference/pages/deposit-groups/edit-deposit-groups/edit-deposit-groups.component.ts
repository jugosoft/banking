import { Component, inject, OnInit } from '@angular/core';
import { ReferenceService } from '../../../reference.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@UntilDestroy()
@Component({
  selector: 'banking-edit-deposit-groups',
  standalone: false,
  templateUrl: './edit-deposit-groups.component.html',
  styleUrls: ['./edit-deposit-groups.component.scss'],
})
export class EditDepositGroupsComponent implements OnInit {
    private readonly referenceService = inject(ReferenceService);
    public isLoading$ = false;
    public depositGroups: any[] = [];
    public displayedColumns: string[] = ['id', 'name', 'actions'];

    public ngOnInit(): void {
        this.loadDepositGroups();
    }

    public loadDepositGroups(): void {
        this.isLoading$ = true;
        // TODO: Implement service call when API is available
        // this.referenceService.depositGroups$
        //     .pipe(
        //         finalize(() => this.isLoading$ = false),
        //         untilDestroyed(this)
        //     )
        //     .subscribe({
        //         next: groups => this.depositGroups = groups
        //     });
        this.isLoading$ = false;
    }

    public onDelete(id: number): void {
        // TODO: Implement delete logic
        console.log('Delete deposit group:', id);
    }

    public onEdit(id: number): void {
        // TODO: Implement edit logic
        console.log('Edit deposit group:', id);
    }

    public onCreate(): void {
        // TODO: Implement create logic
        console.log('Create new deposit group');
    }
}
