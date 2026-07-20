import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IBank } from '@api/bank';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { filter, map, switchMap } from 'rxjs';
import { ReferenceService } from 'src/app/services/api/reference.service';

@UntilDestroy()
@Component({
  selector: 'app-create-bank',
  standalone: false,
  templateUrl: './create-bank.component.html',
  styleUrls: ['./create-bank.component.scss'],
})
export class CreateBankComponent implements OnInit {
  private readonly referenceService = inject(ReferenceService);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly formBuilder = inject(FormBuilder);
  private readonly router = inject(Router);
  private bankId?: number;

  public banks: IBank[] = [];
  public displayedColumns: string[] = ['id', 'name', 'shortName', 'actions'];

  public formGroup = this.formBuilder.group({
    name: this.formBuilder.control('', Validators.required),
    shortName: this.formBuilder.control('', Validators.required),
  });

  public get isEdit(): boolean {
    return typeof this.bankId === 'number';
  }

  public ngOnInit(): void {
    this.loadBanks();
    this.loadBank();
  }

  public loadBanks(): void {
    this.referenceService.banks$
      .pipe(untilDestroyed(this))
      .subscribe({
        next: (banks) => {
          this.banks = banks;
        },
        error: (error) => {
          console.error('Error loading banks:', error);
          this.banks = [];
        }
      });
  }

  public loadBank(): void {
    this.activatedRoute.params.pipe(
      map((params) => +params['bankId']),
      filter((bankId): bankId is number => typeof bankId === 'number' && !Number.isNaN(bankId)),
      switchMap(bankId => {
        return this.referenceService.getBank$(bankId);
      }),
      map(response => response.data!),
      untilDestroyed(this)
    ).subscribe({
      next: bank => {
        this.bankId = bank.id;
        this.formGroup.setValue({
          name: bank.name,
          shortName: bank.shortName
        });
      },
    });
  }

  public onSubmit(): void {
    if (this.formGroup.invalid) {
      return;
    }

    const bankData = {
      id: this.bankId,
      name: this.formGroup.value.name,
      shortName: this.formGroup.value.shortName,
    };

    // @ts-ignore
    this.referenceService.saveBank$(bankData).pipe(
      untilDestroyed(this)
    ).subscribe({
      next: () => {
        void this.router.navigate(['/reference/banks']);
      }
    });
  }

  public onCreate(): void {
    this.bankId = undefined;
    this.formGroup.reset();
  }

  public onEdit(id: number): void {
    void this.router.navigate(['/reference/banks', 'edit', id]);
  }

  public onDelete(id: number): void {
    // TODO: Implement delete logic
    console.log('Delete bank:', id);
  }

  public onCancel(): void {
    this.bankId = undefined;
    this.formGroup.reset();
    void this.router.navigate(['/reference/banks']);
  }
}
