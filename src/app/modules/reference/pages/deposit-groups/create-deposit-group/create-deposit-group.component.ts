import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IDepositGroup } from '@api/deposit-group';
import { filter, map, switchMap } from 'rxjs';
import { ReferenceService } from 'src/app/services/api/reference.service';

@Component({
  selector: 'app-create-deposit-group',
  standalone: false,
  templateUrl: './create-deposit-group.component.html',
  styleUrls: ['./create-deposit-group.component.scss'],
})
export class CreateDepositGroupComponent implements OnInit {
  private readonly destroyRef = inject(DestroyRef);
  private readonly referenceService = inject(ReferenceService);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly formBuilder = inject(FormBuilder);
  private readonly router = inject(Router);
  private depositGroupId?: number;

  public depositGroups: IDepositGroup[] = [];
  public displayedColumns: string[] = ['id', 'code', 'name', 'actions'];

  public formGroup = this.formBuilder.group({
    code: this.formBuilder.control('', Validators.required),
    name: this.formBuilder.control('', Validators.required),
  });

  public get isEdit(): boolean {
    return typeof this.depositGroupId === 'number';
  }

  public ngOnInit(): void {
    this.loadDepositGroup();
  }

  public loadDepositGroup(): void {
    this.activatedRoute.params.pipe(
      map((params) => +params['depositGroupId']),
      filter((depositGroupId): depositGroupId is number => typeof depositGroupId === 'number' && !Number.isNaN(depositGroupId)),
      switchMap(depositGroupId => {
        return this.referenceService.getDepositGroup$(depositGroupId);
      }),
      map(response => response.data!),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe({
      next: depositGroup => {
        this.depositGroupId = depositGroup.id;
        this.formGroup.setValue({
          code: depositGroup.code,
          name: depositGroup.name
        });
      },
    });
  }

  public onSubmit(): void {
    if (this.formGroup.invalid) {
      return;
    }

    const depositGroupData = {
      id: this.depositGroupId,
      code: this.formGroup.value.code,
      name: this.formGroup.value.name,
    };

    // @ts-ignore
    this.referenceService.saveDepositGroup$(depositGroupData).pipe(
      takeUntilDestroyed()
    ).subscribe({
      next: () => {
        void this.router.navigate(['/reference/deposit-groups']);
      }
    });
  }
}
