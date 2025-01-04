import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { register } from '../store/auth.actions';
import {
  selectIsSubmiting,
  selectValidationErrors,
} from '../store/auth.selectors';
import { IRegisterForm } from './model/register-form.interface';

/**
 * Компонент регистрации нового пользователя
 */
@UntilDestroy()
@Component({
  selector: 'banking-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterComponent implements OnInit {
  public formGroup!: FormGroup<IRegisterForm>;
  private readonly formBuilder = inject(FormBuilder);
  private readonly store = inject(Store);
  public readonly isSubmiting$ = this.store.pipe(select(selectIsSubmiting));
  public readonly validationErrors$ = this.store.pipe(
    select(selectValidationErrors)
  );

  public ngOnInit(): void {
    this.initFormGroup();
    this.bindFormState();
  }

  /**
   * Действие при попытке зарегистрироваться. Не должно быть
   * отправки невалидной формы. После клика, если форма невалидна, то
   * подсвечиваем контролы
   */
  public onSubmit(): void {
    const { email, username, password } = this.formGroup.value;
    if (this.formGroup.invalid) {
      this.formGroup.markAllAsTouched();
    }

    if (email && username && password) {
      this.store.dispatch(register({ request: { email, username, password } }));
    }
  }

  /**
   * Инициализация контролов формы и начальных значений
   */
  private initFormGroup(): void {
    this.formGroup = this.formBuilder.nonNullable.group<IRegisterForm>({
      email: this.formBuilder.control(null, Validators.required),
      username: this.formBuilder.control(null, Validators.required),
      password: this.formBuilder.control(null, Validators.required),
      passwordRepeat: this.formBuilder.control(null, Validators.required),
    });
  }

  /**
   * Блокируем контролы формы на время регистрации
   */
  private bindFormState(): void {
    this.isSubmiting$.pipe(untilDestroyed(this)).subscribe({
      next: (isSubmiting) => {
        if (isSubmiting) {
          this.formGroup.disable();
        } else {
          this.formGroup.enable();
        }
      },
    });
  }
}
