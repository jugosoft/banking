import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IDepositGroup } from '@api/deposit-group';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { filter, map, switchMap } from 'rxjs';
import { ReferenceService } from 'src/app/services/api/reference.service';

@UntilDestroy()
@Component({
  selector: 'app-create-deposit-group',
  standalone: false,
  templateUrl: './create-deposit-group.component.html',
  styleUrls: ['./create-deposit-group.component.scss'],
})
export class CreateDepositGroupComponent implements OnInit {
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
      untilDestroyed(this)
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
      untilDestroyed(this)
    ).subscribe({
      next: () => {
        void this.router.navigate(['/reference/deposit-groups']);
      }
    });
  }
}
