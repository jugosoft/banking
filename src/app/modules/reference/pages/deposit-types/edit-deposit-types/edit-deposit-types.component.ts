import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { IDepositType } from '@api/deposit-type';
import { IDepositGroup } from '@api/deposit-group';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
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
  private readonly router = inject(Router);
  private readonly cdRef = inject(ChangeDetectorRef);
  public depositTypes: IDepositType[] = [];
  public displayedColumns: string[] = ['id', 'name', 'actions'];

  public ngOnInit(): void {
    this.loadDepositTypes();
  }

  public loadDepositTypes(): void {
    this.referenceService.depositTypes$
      .pipe(untilDestroyed(this))
      .subscribe({
        next: (types) => {
          // Use setTimeout to defer the update to the next tick
          // This prevents the ExpressionChangedAfterItHasBeenCheckedError
          setTimeout(() => {
            this.depositTypes = types;
            this.cdRef.markForCheck();
          });
        },
        error: (error) => {
          console.error('Error loading deposit types:', error);
          this.depositTypes = [];
          this.cdRef.markForCheck();
        }
      });
  }

  public onDelete(id: number): void {
    this.referenceService.deleteDepositType$(id)
      .pipe(untilDestroyed(this))
      .subscribe({
        next: (success) => {
          if (success) {
            this.loadDepositTypes();
          }
        },
        error: (error) => {
          console.error('Error deleting deposit type:', error);
        }
      });
  }

  public onEdit(id: number): void {
    void this.router.navigate(['/reference', 'deposit-types', 'edit', id]);
  }

  public onCreate(): void {
    void this.router.navigate(['/reference', 'deposit-types', 'create']);
  }
}
