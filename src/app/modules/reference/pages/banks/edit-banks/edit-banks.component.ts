import { Component, inject, OnInit } from '@angular/core';
import { ReferenceService } from '../../../reference.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
    selector: 'banking-edit-banks',
    standalone: false,
    templateUrl: './edit-banks.component.html',
    styleUrls: ['./edit-banks.component.scss'],
})
export class EditBanksComponent implements OnInit {
    private readonly referenceService = inject(ReferenceService);
    public isLoading$ = false;
    public banks: any[] = [];
    public displayedColumns: string[] = ['id', 'name', 'shortName', 'actions'];

    public ngOnInit(): void {
        this.loadBanks();
    }

    public loadBanks(): void {
        this.isLoading$ = true;
        // TODO: Implement service call when API is available
        // this.referenceService.banks$
        //     .pipe(
        //         finalize(() => this.isLoading$ = false),
        //         untilDestroyed(this)
        //     )
        //     .subscribe({
        //         next: banks => this.banks = banks
        //     });
        this.isLoading$ = false;
    }

    public onDelete(id: number): void {
        // TODO: Implement delete logic
        console.log('Delete bank:', id);
    }

    public onEdit(id: number): void {
        // TODO: Implement edit logic
        console.log('Edit bank:', id);
    }

    public onCreate(): void {
        // TODO: Implement create logic
        console.log('Create new bank');
    }
}
