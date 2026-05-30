import {
    ChangeDetectionStrategy,
    Component,
    inject,
    OnInit,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { saveDeposit } from '../store/deposit.actions';
import { ActivatedRoute, Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { filter, map, switchMap } from 'rxjs';
import { DepositService } from '../../../services/api/deposit.service';
import { ReferenceService } from '../../../services/api/reference.service';

/**
 * Компонент создания инвест-продукта
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
                console.log(response);
                // После успешного сохранения переходим на роут /home
                this.router.navigate(['/home']);
            }
        });
    }

    public readonly compareFn = <T extends { id: number }>(a?: T, b?: T) => {
        return a?.id === b?.id;
    };
}
