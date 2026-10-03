import {
    ChangeDetectionStrategy,
    Component,
    inject,
    OnInit,
} from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDatepicker, MatDatepickerInputEvent, MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AsyncPipe, NgFor } from '@angular/common';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { filter, map, switchMap } from 'rxjs';
import { DepositService } from '../../../services/api/deposit.service';
import { ReferenceService } from '../../../services/api/reference.service';

@UntilDestroy()
@Component({
    selector: 'banking-deposit',
    standalone: true,
    imports: [
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatCheckboxModule,
        MatButtonToggleModule,
        MatButtonModule,
        MatDatepickerModule,
        AsyncPipe
    ],
    templateUrl: './deposit-create.component.html',
    styleUrl: './deposit-create.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DepositCreateComponent implements OnInit {
    private readonly formBuilder = inject(FormBuilder);
    private readonly activatedRoute = inject(ActivatedRoute);
    private readonly router = inject(Router);
    private readonly depositService = inject(DepositService);
    private readonly referenceService = inject(ReferenceService);
    public formGroup!: FormGroup;
    private depositId?: number;
    public banks$ = this.referenceService.banks$;
    public depositTypes$ = this.referenceService.depositTypes$;

    public readonly periodOptions = [
        { label: '3 месяца', value: 3 },
        { label: '4 месяца', value: 4 },
        { label: '6 месяцев', value: 6 },
        { label: '1 год', value: 12 },
        { label: 'Собственное', value: 'custom' as const },
    ];
    public selectedPeriod: number | 'custom' = 'custom';

    public ngOnInit(): void {
        this.formGroup = this.formBuilder.group({
            bank: this.formBuilder.control(null, Validators.required),
            depositType: this.formBuilder.control(null, Validators.required),
            percent: this.formBuilder.control(0, [Validators.required, Validators.min(0), Validators.max(100)]),
            amount: this.formBuilder.control(100_000),
            startDate: this.formBuilder.control(
                new Date(),
                Validators.required
            ),
            endDate: this.formBuilder.control(null, Validators.required),
            term: this.formBuilder.control(0, Validators.required),
            capitalization: this.formBuilder.control(false),
        });

        this.activatedRoute.params.pipe(
            map((params) => +params['depositId']),
            filter((depositId): depositId is number => typeof depositId === 'number' && !Number.isNaN(depositId)),
            switchMap((depositId) => {
                return this.depositService.getDeposit$(depositId);
            }),
            map(response => response.data!),
            untilDestroyed(this)
        ).subscribe({
            next: deposit => {
                this.depositId = deposit.id;
                this.formGroup.setValue({
                    bank: deposit.bank,
                    depositType: deposit.depositType,
                    percent: deposit.percent,
                    amount: deposit.amount,
                    startDate: deposit.startDate,
                    endDate: deposit.endDate,
                    term: null,
                    capitalization: deposit.capitalization
                });
                this.updatePeriodFromDates();
            },
        });
    }

    public save(): void {
        if (this.formGroup.invalid) {
            return;
        }

        const value = this.formGroup.value;
        this.depositService.saveDeposit$({
            id: this.depositId,
            bankId: value.bank.id,
            depositTypeId: value.depositType.id,
            amount: value.amount,
            percent: value.percent,
            startDate: value.startDate,
            endDate: value.endDate,
            term: value.term,
            capitalization: value.capitalization,
        }).pipe(
            untilDestroyed(this)
        ).subscribe({
            next: () => {
                this.router.navigate(['/home']);
            }
        });
    }

    public readonly compareFn = <T extends { id: number }>(a?: T, b?: T) => {
        return a?.id === b?.id;
    };

    public onEndDateChange(event: MatDatepickerInputEvent<Date>): void {
        this.updatePeriodFromDates();
    }

    public isEndDateValid(): boolean {
        const startDate = this.formGroup.get('startDate')?.value;
        const endDate = this.formGroup.get('endDate')?.value;

        if (!startDate || !endDate) {
            return true;
        }

        return new Date(endDate) >= new Date(startDate);
    }

    private updatePeriodFromDates(): void {
        const startDate = this.formGroup.get('startDate')?.value;
        const endDate = this.formGroup.get('endDate')?.value;

        if (!startDate || !endDate) {
            this.selectedPeriod = 'custom';
            this.formGroup.patchValue({ term: 0 });
            return;
        }

        const start = new Date(startDate);
        const end = new Date(endDate);

        const months = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());

        const matchingPeriod = this.periodOptions.find(
            option => option.value !== 'custom' && option.value === months
        );

        this.selectedPeriod = matchingPeriod ? matchingPeriod.value : 'custom';
        this.formGroup.patchValue({ term: months });
    }

    public onPeriodChange(period: number | 'custom'): void {
        this.selectedPeriod = period;

        if (period !== 'custom') {
            const startDate = this.formGroup.get('startDate')?.value;
            if (startDate) {
                const start = new Date(startDate);
                const endDate = new Date(start);
                endDate.setMonth(endDate.getMonth() + period);

                this.formGroup.patchValue({
                    endDate: endDate,
                    term: period
                });
            }
        }
    }
}
