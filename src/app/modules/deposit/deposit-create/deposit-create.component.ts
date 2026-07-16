import {
    ChangeDetectionStrategy,
    Component,
    inject,
    OnInit,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { Store } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { filter, map, switchMap } from 'rxjs';
import { DepositService } from '../../../services/api/deposit.service';
import { ReferenceService } from '../../../services/api/reference.service';

/**
 * Компонент создания инвести-продукта
 */
@UntilDestroy()
@Component({
    selector: 'banking-deposit',
    standalone: false,
    templateUrl: './deposit-create.component.html',
    styleUrl: './deposit-create.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DepositCreateComponent implements OnInit {
    private readonly store = inject(Store);
    private readonly formBuilder = inject(FormBuilder);
    private readonly activatedRoute = inject(ActivatedRoute);
    private readonly router = inject(Router);
    private readonly depositService = inject(DepositService);
    private readonly referenceService = inject(ReferenceService);
    public formGroup!: FormGroup;
    public banks$ = this.referenceService.banks$;
    public depositTypes$ = this.referenceService.depositTypes$;

    // Сегментные кнопки для быстрого выбора периода
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
        });

        // Инициализация формы
        this.activatedRoute.params.pipe(
            map((params) => +params['depositId']),
            filter(
                (depositId): depositId is number =>
                    typeof depositId === 'number' &&
                    !Number.isNaN(depositId)
            ),
            switchMap((depositId) => {
                return this.depositService.getDeposit$(depositId);
            }),
            untilDestroyed(this)
        ).subscribe({
            next: (deposit) => {
                this.formGroup.setValue({
                    ...deposit,
                });
                // После загрузки данных обновляем активную кнопку сегмента
                this.updatePeriodFromDates();
            },
        });
    }

    private loadReferenceData(): void {
        // Удаляем ручную загрузку данных, так как они уже загружаются в сервисе
        // и доступны через Observable
    }

    public save(): void {
        if (this.formGroup.invalid) {
            return;
        }

        const value = this.formGroup.value;
        this.depositService.saveDeposit$({
            bankId: value.bank.id,
            depositTypeId: value.depositType.id,
            amount: value.amount,
            percent: value.percent,
            startDate: value.startDate,
            endDate: value.endDate,
        }).pipe(
            untilDestroyed(this)
        ).subscribe({
            next: response => {
                // После успешного сохранения переходим на роут /home
                this.router.navigate(['/home']);
            }
        });
    }

    public readonly compareFn = <T extends { id: number }>(a?: T, b?: T) => {
        return a?.id === b?.id;
    };

    // Обработчик изменения даты окончания
    public onEndDateChange(event: MatDatepickerInputEvent<Date>): void {
        this.updatePeriodFromDates();
    }

    // Проверка валидации даты окончания не раньше даты начала
    public isEndDateValid(): boolean {
        const startDate = this.formGroup.get('startDate')?.value;
        const endDate = this.formGroup.get('endDate')?.value;

        if (!startDate || !endDate) {
            return true;
        }

        return new Date(endDate) >= new Date(startDate);
    }

    // Обновление активной кнопки сегмента на основе выбранных дат
    private updatePeriodFromDates(): void {
        const startDate = this.formGroup.get('startDate')?.value;
        const endDate = this.formGroup.get('endDate')?.value;

        if (!startDate || !endDate) {
            this.selectedPeriod = 'custom';
            return;
        }

        const start = new Date(startDate);
        const end = new Date(endDate);

        // Вычисляем разницу в месяцах
        const months = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());

        // Проверяем, совпадает ли с одним из предустановленных периодов
        const matchingPeriod = this.periodOptions.find(
            option => option.value !== 'custom' && option.value === months
        );

        this.selectedPeriod = matchingPeriod ? matchingPeriod.value : 'custom';
    }

    // Обработка выбора периода через сегментный переключатель
    public onPeriodChange(period: number | 'custom'): void {
        this.selectedPeriod = period;

        if (period !== 'custom') {
            const startDate = this.formGroup.get('startDate')?.value;
            if (startDate) {
                const start = new Date(startDate);
                const endDate = new Date(start);
                endDate.setMonth(endDate.getMonth() + period);

                this.formGroup.patchValue({
                    endDate: endDate
                });
            }
        }
    }
}
