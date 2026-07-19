import { Component, inject, OnInit } from '@angular/core';
import { IDepositGroup } from '@api/deposit-group';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { ReferenceService } from 'src/app/services/api/reference.service';

@UntilDestroy()
@Component({
  selector: 'banking-edit-deposit-groups',
  standalone: false,
  templateUrl: './edit-deposit-groups.component.html',
  styleUrls: ['./edit-deposit-groups.component.scss'],
})
export class EditDepositGroupsComponent implements OnInit {
  private readonly referenceService = inject(ReferenceService);
  public isLoading$ = true;
  public depositGroups: IDepositGroup[] = [];
  public displayedColumns: string[] = ['id', 'name', 'actions'];

  public ngOnInit(): void {
    this.loadDepositGroups();
  }

  public loadDepositGroups(): void {
    this.referenceService.depositGroups$.pipe(
      untilDestroyed(this)
    ).subscribe({
      next: (groups) => {
        this.depositGroups = groups;
        this.isLoading$ = false;
      }
    });
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
