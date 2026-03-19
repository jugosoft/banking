import {
    ChangeDetectionStrategy,
    Component,
    inject,
    OnInit,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { saveDeposit } from '../store/deposit.actions';
import { ActivatedRoute } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { filter, map, switchMap } from 'rxjs';
import { DepositService } from '../../../services/api/deposit.service';

/**
 * Компонент создания инвест-продукта
 */
@UntilDestroy()
@Component({
    selector: 'banking-deposit',
    templateUrl: './deposit-create.component.html',
    styleUrl: './deposit-create.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DepositCreateComponent implements OnInit {
    private readonly store = inject(Store);
    private readonly formBuilder = inject(FormBuilder);
    private readonly activatedRoute = inject(ActivatedRoute);
    private readonly depositService = inject(DepositService);
    public formGroup!: FormGroup;

    public ngOnInit(): void {
        this.formGroup = this.formBuilder.group({
            bank: this.formBuilder.control(null),
            type: this.formBuilder.control(0),
            percent: this.formBuilder.control(0),
            amount: this.formBuilder.control(100_000),
            startDate: this.formBuilder.control(
                new Date(),
                Validators.required
            ),
            endDate: this.formBuilder.control(null, Validators.required),
        });
        this.activatedRoute.params
            .pipe(
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
            )
            .subscribe({
                next: (deposit) => {
                    this.formGroup.setValue({
                        ...deposit,
                    });
                },
            });
    }

    public save(): void {
        if (this.formGroup.invalid) {
            return;
        }

        const value = this.formGroup.value;
        this.store.dispatch(
            saveDeposit({
                deposit: {
                    bankId: value.bank.id,
                    typeId: value.type.id,
                    amount: value.amount,
                    percent: value.percent,
                    startDate: value.startDate,
                    endDate: value.endDate,
                },
            })
        );
    }

    // public readonly compareFn = (a?: IOption, b?: IOption) => {
    //     return a?.id === b?.id;
    // };
}
