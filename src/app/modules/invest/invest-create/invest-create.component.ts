import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { AsyncPipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, map, switchMap } from 'rxjs';
import { InvestService } from 'src/app/services/api/invest.service';
import { ReferenceService } from 'src/app/services/api/reference.service';
import { IInvestForm } from './model/invest-form.model';
import { MatDatepickerModule } from '@angular/material/date-picker';
import { InvestmentChartComponent } from './investment-chart/investment-chart.component';
import { IInvestmentChartData } from './model/investment-chart-data.model';

@Component({
  selector: 'app-invest-create',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    AsyncPipe,
    MatDatepickerModule,
    InvestmentChartComponent,
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
    map((depositTypes) =>
      depositTypes.filter((type) => type.name === 'Инвестиции')
    )
  );

  private investId?: number;
  public formGroup!: FormGroup<IInvestForm>;
  public chartData: IInvestmentChartData[] = [];
  public showChart = false;

  public ngOnInit(): void {
    this.formGroup = this.formBuilder.group<IInvestForm>({
      bank: [null],
      depositType: [null],
      amount: [null, [Validators.required, Validators.min(0)]],
      startDate: [new Date(), [Validators.required]],
      snapshotDate: [new Date(), [Validators.required]],
    });

    this.activatedRoute.params.pipe(
      map((params) => +params['investId']),
      filter(
        (investId): investId is number =>
          typeof investId === 'number' && !Number.isNaN(investId)
      ),
      switchMap((investId) => this.investService.getInvest$(investId)),
      map((response) => response.data!)
    ).subscribe({
      next: (invest) => {
        this.investId = invest.id;
        this.formGroup.patchValue({
          bank: invest.bank,
          depositType: invest.depositType,
          amount: invest.amount,
          startDate: invest.startDate,
        });

        if (invest.history && invest.history.length > 0) {
          this.showChart = true;
          this.chartData = this.mapToChartData(invest.history);
        }
      },
    });
  }

  public readonly compareFn = <T extends { id: number }>(a?: T, b?: T) => {
    return a?.id === b?.id;
  };

  private mapToChartData(
    history: { amount: number; date: Date | string }[]
  ): IInvestmentChartData[] {
    const sorted = [...history].sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return dateA - dateB;
    });

    return sorted.map((item) => {
      const date = new Date(item.date);
      return {
        formattedDate: `${date.getDate().toString().padStart(2, '0')}.${(date.getMonth() + 1).toString().padStart(2, '0')}.${date.getFullYear()}`,
        amount: item.amount,
      };
    });
  }

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
      snapshotDate: value.snapshotDate,
    };

    this.investService.saveInvest$(investData).subscribe({
      next: () => {
        void this.router.navigate(['/invest']);
      },
    });
  }
}
