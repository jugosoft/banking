import { Component, DestroyRef, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { IBank } from '@api/bank';
import { ReferenceService } from 'src/app/services/api/reference.service';

@Component({
  selector: 'banking-edit-banks',
  standalone: false,
  templateUrl: './edit-banks.component.html',
  styleUrls: ['./edit-banks.component.scss'],
})
export class EditBanksComponent implements OnInit {
  private readonly destroyRef = inject(DestroyRef);
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
      .pipe(takeUntilDestroyed(this.destroyRef))
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
      .pipe(takeUntilDestroyed(this.destroyRef))
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
