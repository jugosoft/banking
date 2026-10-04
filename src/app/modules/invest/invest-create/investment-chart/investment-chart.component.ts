import { Component, Input } from '@angular/core';
import { NgApexchartsModule } from 'ng-apexcharts';
import { ApexAxisChartSeries, ApexOptions } from 'apexcharts';
import { IInvestmentChartData } from '../model/investment-chart-data.model';

@Component({
  selector: 'app-investment-chart',
  standalone: true,
  imports: [NgApexchartsModule],
  template: `
    @if (data.length > 0) {
      <h3>История изменения суммы</h3>
      <apx-chart
        [series]="series"
        [chart]="chartConfig.chart"
        [xaxis]="chartConfig.xaxis"
        [markers]="chartConfig.markers"
        [stroke]="chartConfig.stroke"
      ></apx-chart>
    }
  `,
  styles: [`
    h3 {
      margin-bottom: 1rem;
      font-size: 16px;
      font-weight: 500;
    }
  `],
})
export class InvestmentChartComponent {
  @Input() public data: IInvestmentChartData[] = [];

  public get series(): ApexAxisChartSeries {
    return [
      {
        name: 'Сумма',
        data: this.data.map(item => item.amount),
      },
    ];
  }

  public get chartConfig(): Partial<ApexOptions> {
    return {
      chart: {
        type: 'line',
        height: 350,
      },
      xaxis: {
        categories: this.data.map(item => item.formattedDate),
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
}
