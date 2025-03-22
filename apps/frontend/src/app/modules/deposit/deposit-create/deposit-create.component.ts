import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { saveDeposit } from '../store/deposit.actions';

/**
 * Компонент создания инвест-продукта
 */
@Component({
  selector: 'banking-deposit',
  templateUrl: './deposit-create.component.html',
  styleUrl: './deposit-create.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DepositCreateComponent implements OnInit {
  private readonly store = inject(Store);
  private readonly formBuilder = inject(FormBuilder);
  public formGroup!: FormGroup;

  public ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      bank: this.formBuilder.control(null),
      type: this.formBuilder.control(0),
      percent: this.formBuilder.control(0),
      amount: this.formBuilder.control(100_000),
      startDate: this.formBuilder.control(new Date()),
      endDate: this.formBuilder.control(null),
    })
  }

  public save(): void {
    if (this.formGroup.invalid) {
      return;
    }

    const value = this.formGroup.value; 0
    this.store.dispatch(saveDeposit({
      bankId: value.bank,
      typeId: value.type,
      amount: value.amount,
      percent: value.percent,
      startDate: value.startDate,
      endDate: value.endDate
    }));
  }
}
