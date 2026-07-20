import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IDepositType } from '@api/deposit-type';
import { IDepositGroup } from '@api/deposit-group';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { filter, map, switchMap } from 'rxjs';
import { ReferenceService } from 'src/app/services/api/reference.service';

@UntilDestroy()
@Component({
  selector: 'app-create-deposit-type',
  standalone: false,
  templateUrl: './create-deposit-type.component.html',
  styleUrls: ['./create-deposit-type.component.scss'],
})
export class CreateDepositTypeComponent implements OnInit {
  private readonly referenceService = inject(ReferenceService);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly formBuilder = inject(FormBuilder);
  private readonly router = inject(Router);
  private depositTypeId?: number;

  public depositTypes: IDepositType[] = [];
  public depositGroups$ = this.referenceService.depositGroups$;
  public displayedColumns: string[] = ['id', 'name', 'actions'];

  public formGroup = this.formBuilder.group({
    name: this.formBuilder.control('', Validators.required),
    depositGroup: this.formBuilder.control(null, Validators.required),
  });

  public get isEdit(): boolean {
    return typeof this.depositTypeId === 'number';
  }

  public ngOnInit(): void {
    this.loadDepositType();
  }

  public readonly compareFn = <T extends { id: number }>(a?: T, b?: T) => {
    return a?.id === b?.id;
  };

  private loadDepositType(): void {
    this.activatedRoute.params.pipe(
      map((params) => +params['depositTypeId']),
      filter((depositTypeId): depositTypeId is number => typeof depositTypeId === 'number' && !Number.isNaN(depositTypeId)),
      switchMap(depositTypeId => {
        return this.referenceService.getDepositType$(depositTypeId);
      }),
      map(response => response.data!),
      untilDestroyed(this)
    ).subscribe({
      next: depositType => {
        this.depositTypeId = depositType.id;
        this.formGroup.setValue({
          name: depositType.name,
          // @ts-ignore
          depositGroup: depositType.depositGroup
        });
      },
    });
  }

  public onSubmit(): void {
    if (this.formGroup.invalid) {
      return;
    }

    const depositTypeData = {
      id: this.depositTypeId,
      name: this.formGroup.value.name,
      // @ts-ignore
      depositGroupId: this.formGroup.value.depositGroup.id,
    };

    // @ts-ignore
    this.referenceService.saveDepositType$(depositTypeData).pipe(
      untilDestroyed(this)
    ).subscribe({
      next: () => {
        void this.router.navigate(['/reference/deposit-types']);
      }
    });
  }

  public onCreate(): void {
    this.depositTypeId = undefined;
    this.formGroup.reset();
  }

  public onEdit(id: number): void {
    void this.router.navigate(['/reference/deposit-types', 'edit', id]);
  }

  public onDelete(id: number): void {
    // TODO: Implement delete logic
    console.log('Delete deposit type:', id);
  }

  public onCancel(): void {
    this.depositTypeId = undefined;
    this.formGroup.reset();
    void this.router.navigate(['/reference/deposit-types']);
  }
}
