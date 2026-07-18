import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { InvestService } from 'src/app/services/api/invest.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { ReferenceService } from 'src/app/services/api/reference.service';
import { map } from 'rxjs';

@UntilDestroy()
@Component({
    selector: 'app-invest-create',
    standalone: false,
    templateUrl: './invest-create.component.html',
    styleUrl: './invest-create.component.scss',
})
export class InvestCreateComponent {
    private readonly formBuilder = inject(FormBuilder);
    private readonly investService = inject(InvestService);
    private readonly router = inject(Router);

    private readonly referenceService = inject(ReferenceService);
    public banks$ = this.referenceService.banks$;
    public depositTypes$ = this.referenceService.depositTypes$.pipe(
        map(depositTypes => depositTypes.filter(type => type.name === 'Инвестиции'))
    );

    public form = this.formBuilder.group({
        bank: [null, [Validators.required]],
        depositType: [null, [Validators.required]],
        amount: [null, [Validators.required, Validators.min(0)]],
        startDate: [new Date(), [Validators.required]],
    });


    public readonly compareFn = <T extends { id: number }>(a?: T, b?: T) => {
        return a?.id === b?.id;
    };

    public onSubmit(): void {
        if (this.form.invalid) {
            return;
        }

        const investData = {
            amount: this.form.value.amount,
            startDate: this.form.value.startDate,
            // @ts-ignore
            bankId: this.form.value.bank.id,
            // @ts-ignore
            depositTypeId: this.form.value.depositType.id,
        };

        // @ts-ignore
        this.investService.saveInvest$(investData).pipe(
            untilDestroyed(this)
        ).subscribe({
            next: (success) => {
                if (success) {
                    void this.router.navigate(['/invest']);
                }
            }
        });
    }
}
