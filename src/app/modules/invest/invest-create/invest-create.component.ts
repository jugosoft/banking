import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { InvestService } from 'src/app/services/api/invest.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { ReferenceService } from 'src/app/services/api/reference.service';
import { filter, map, switchMap } from 'rxjs';

@UntilDestroy()
@Component({
  selector: 'app-invest-create',
  standalone: false,
  templateUrl: './invest-create.component.html',
  styleUrl: './invest-create.component.scss',
})
export class InvestCreateComponent implements OnInit {
  private readonly formBuilder = inject(FormBuilder);
  private readonly investService = inject(InvestService);
  private readonly router = inject(Router);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly referenceService = inject(ReferenceService);

  public banks$ = this.referenceService.banks$;
  public depositTypes$ = this.referenceService.depositTypes$.pipe(
    map(depositTypes => depositTypes.filter(type => type.name === 'Инвестиции'))
  );
  private investId?: number;

  public formGroup = this.formBuilder.group({
    bank: [null, [Validators.required]],
    depositType: [null, [Validators.required]],
    amount: [null, [Validators.required, Validators.min(0)]],
    startDate: [new Date(), [Validators.required]],
  });

  public ngOnInit(): void {
    this.activatedRoute.params.pipe(
      map((params) => +params['investId']),
      filter((investId): investId is number => typeof investId === 'number' && !Number.isNaN(investId)),
      switchMap(investId => {
        return this.investService.getInvest$(investId);
      }),
      map(response => response.data!),
      untilDestroyed(this)
    ).subscribe({
      next: invest => {
        this.investId = invest.id;
        this.formGroup.setValue({
          // @ts-ignore
          bank: invest.bank,
          // @ts-ignore
          depositType: invest.depositType,
          // @ts-ignore
          amount: invest.amount,
          startDate: invest.startDate
        });
      },
    });
  }

  public readonly compareFn = <T extends { id: number }>(a?: T, b?: T) => {
    return a?.id === b?.id;
  };

  public onSubmit(): void {
    if (this.formGroup.invalid) {
      return;
    }

    const investData = {
      id: this.investId,
      amount: this.formGroup.value.amount,
      startDate: this.formGroup.value.startDate,
      // @ts-ignore
      bankId: this.formGroup.value.bank.id,
      // @ts-ignore
      depositTypeId: this.formGroup.value.depositType.id,
    };

    // @ts-ignore
    this.investService.saveInvest$(investData).pipe(
      untilDestroyed(this)
    ).subscribe({
      next: () => {
        void this.router.navigate(['/invest']);
      }
    });
  }
}
