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
import { MatDatepickerModule } from '@angular/material/datepicker';
import { NgApexchartsModule } from 'ng-apexcharts';
import { ApexOptions, ApexAxisChartSeries } from 'apexcharts';

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
    NgApexchartsModule,
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
  public chartConfig: Partial<ApexOptions> = {};
  public chartXAxisConfig: ApexOptions['xaxis'] = {};
  public investmentHistorySeries: ApexAxisChartSeries = [];
  public showChart = false;

  public ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      bank: [null],
      depositType: [null],
      amount: [null, [Validators.required, Validators.min(0)]],
      startDate: [new Date(), [Validators.required]],
      snapshotDate: [new Date(), [Validators.required]],
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
          ...this.formGroup.value,
          bank: invest.bank,
          depositType: invest.depositType,
          amount: invest.amount,
          startDate: invest.startDate,
        });

        if (invest.history && invest.history.length > 0) {
          this.showChart = true;
          this.buildChart(invest.history);
        }
      },
    });
  }

  public readonly compareFn = <T extends { id: number }>(a?: T, b?: T) => {
    return a?.id === b?.id;
  };

  private buildChart(history: { amount: number; date: Date | string }[]): void {
    const sortedHistory = [...history].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    const categories = sortedHistory.map(item => {
      const date = new Date(item.date);
      return `${date.getDate().toString().padStart(2, '0')}.${(date.getMonth() + 1).toString().padStart(2, '0')}.${date.getFullYear()}`;
    });

    const data = sortedHistory.map(item => item.amount);

    this.investmentHistorySeries = [
      {
        name: 'Сумма',
        data: data,
      },
    ];

    this.chartXAxisConfig = {
      categories: categories,
    };

    this.chartConfig = {
      chart: {
        type: 'line',
        toolbar: {
          show: true,
        },
        height: 350,
      },
      title: {
        text: 'История изменения суммы инвестиции',
        align: 'left',
        style: {
          fontSize: '14px',
        },
      },
      markers: {
        size: 4,
      },
      stroke: {
        curve: 'smooth',
        width: 2,
      },
    };
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
      }
    });
  }
}
