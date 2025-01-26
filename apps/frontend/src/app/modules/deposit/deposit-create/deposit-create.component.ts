import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';

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
      amount: this.formBuilder.control(100_000),
      startDate: this.formBuilder.control(new Date()),
      endDate: this.formBuilder.control(null),
    })
  }

  public save(): void {
    console.log(this.formGroup.value);
  }
}
