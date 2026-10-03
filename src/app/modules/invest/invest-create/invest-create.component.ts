import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { AsyncPipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { InvestService } from 'src/app/services/api/invest.service';
import { ReferenceService } from 'src/app/services/api/reference.service';
import { filter, map, switchMap } from 'rxjs';
import { IInvestForm } from './model/invest-form.model';
import { MatDatepicker, MatDatepickerModule } from '@angular/material/datepicker';

@Component({
  selector: 'app-invest-create',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatSelectModule,
    MatButtonModule,
    AsyncPipe,
  ],
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
  public formGroup!: FormGroup<any>;

  public ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      bank: [null],
      depositType: [null],
      amount: [null, [Validators.required, Validators.min(0)]],
      startDate: [new Date(), [Validators.required]],
    });

    this.activatedRoute.params.pipe(
      map((params) => +params['investId']),
      filter((investId): investId is number => typeof investId === 'number' && !Number.isNaN(investId)),
      switchMap(investId => {
        return this.investService.getInvest$(investId);
      }),
      map(response => response.data!)
    ).subscribe({
      next: invest => {
        this.investId = invest.id;
        this.formGroup.setValue({
          bank: invest.bank,
          depositType: invest.depositType,
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

    const value = this.formGroup.value;
    const investData = {
      id: this.investId,
      amount: value.amount,
      startDate: value.startDate,
      bankId: value.bank?.id,
      depositTypeId: value.depositType?.id,
    };

    this.investService.saveInvest$(investData).subscribe({
      next: () => {
        void this.router.navigate(['/invest']);
      }
    });
  }
}
