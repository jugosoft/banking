import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
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
  private readonly router = inject(Router);
  private readonly cdRef = inject(ChangeDetectorRef);
  public depositGroups: IDepositGroup[] = [];
  public displayedColumns: string[] = ['id', 'code', 'name', 'actions'];

  public ngOnInit(): void {
    this.loadDepositGroups();
  }

  public loadDepositGroups(): void {
    this.referenceService.depositGroups$
      .pipe(untilDestroyed(this))
      .subscribe({
        next: (groups) => {
          this.depositGroups = groups;
          this.cdRef.detectChanges();
        },
        error: (error) => {
          console.error('Error loading deposit groups:', error);
          this.depositGroups = [];
          this.cdRef.detectChanges();
        }
      });
  }

  public onDelete(id: number): void {
    this.referenceService.deleteDepositGroup$(id)
      .pipe(untilDestroyed(this))
      .subscribe();
  }

  public onEdit(id: number): void {
    void this.router.navigate(['/reference/deposit-groups', 'edit', id]);
  }

  public onCreate(): void {
    void this.router.navigate(['/reference', 'deposit-groups', 'create']);
  }
}
