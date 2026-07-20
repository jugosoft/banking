import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { IBank } from '@api/bank';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { ReferenceService } from 'src/app/services/api/reference.service';

@UntilDestroy()
@Component({
  selector: 'banking-edit-banks',
  standalone: false,
  templateUrl: './edit-banks.component.html',
  styleUrls: ['./edit-banks.component.scss'],
})
export class EditBanksComponent implements OnInit {
  private readonly referenceService = inject(ReferenceService);
  private readonly router = inject(Router);
  private readonly cdRef = inject(ChangeDetectorRef);
  public banks: IBank[] = [];
  public displayedColumns: string[] = ['id', 'name', 'shortName', 'actions'];

  public ngOnInit(): void {
    this.loadBanks();
  }

  public loadBanks(): void {
    this.referenceService.banks$
      .pipe(untilDestroyed(this))
      .subscribe({
        next: (banks) => {
          this.banks = banks;
          this.cdRef.detectChanges();
        },
        error: (error) => {
          console.error('Error loading banks:', error);
          this.banks = [];
          this.cdRef.detectChanges();
        }
      });
  }

  public onDelete(bankId: number): void {
    this.referenceService.deleteBank$(bankId)
      .pipe(untilDestroyed(this))
      .subscribe({
        next: () => this.loadBanks()
      });
  }

  public onEdit(id: number): void {
    void this.router.navigate(['/reference/banks', 'edit', id]);
  }

  public onCreate(): void {
    void this.router.navigate(['/reference', 'banks', 'create']);
  }
}
