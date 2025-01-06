import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { login } from '../store/auth.actions';
import {
  selectIsSubmiting,
  selectValidationErrors,
} from '../store/auth.selectors';
import { ILoginForm } from './model/login-form.interface';

/**
 * Компонент логина пользователя
 */
@UntilDestroy()
@Component({
  selector: 'banking-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit {
  public formGroup!: FormGroup<ILoginForm>;
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
   * Действие при попытке логина. После клика, если форма
   * невалидна, то подсвечиваем контролы
   */
  public onSubmit(): void {
    const { email, password } = this.formGroup.value;
    if (this.formGroup.invalid) {
      this.formGroup.markAllAsTouched();
    }

    if (email && password) {
      this.store.dispatch(login({ request: { email, password } }));
    }
  }

  /**
   * Инициализация контролов формы и начальных значений
   */
  private initFormGroup(): void {
    this.formGroup = this.formBuilder.nonNullable.group<ILoginForm>({
      email: this.formBuilder.control(null, Validators.required),
      password: this.formBuilder.control(null, Validators.required),
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
