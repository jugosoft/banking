import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ICurrentUser } from '../auth/types';
import { ProfileState } from './store/profile.state';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { ProfileService } from './services/profile.service';
import { updateName, updateEmail, updateUsername, updatePassword } from './store/profile.actions';
import { selectIsSubmitting, selectValidationErrors } from './store/profile.selectors';
import { MatFormField, MatFormFieldModule } from "@angular/material/form-field";
import { MaterialModule } from "../material/material.module";
import { MatProgressSpinner } from "@angular/material/progress-spinner";

@UntilDestroy()
@Component({
  selector: 'banking-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  imports: [MatFormField, MatFormFieldModule, MatProgressSpinner]
})
export class ProfileComponent implements OnInit {
  public currentUser$: Observable<ICurrentUser | null>;
  public isSubmitting$: Observable<boolean>;
  public validationErrors$: Observable<string | null>;
  public personalForm!: FormGroup;
  public contactForm!: FormGroup;
  public passwordForm!: FormGroup;
  public editMode = {
    personal: false,
    contact: false,
    password: false
  };
  public loading = {
    personal: false,
    contact: false,
    password: false
  };

  private readonly store = inject(Store);
  private readonly profileService = inject(ProfileService);
  private readonly formBuilder = inject(FormBuilder);

  constructor() {
    this.currentUser$ = this.store.pipe(select(selectCurrentUser));
    this.isSubmitting$ = this.store.pipe(select(selectIsSubmitting));
    this.validationErrors$ = this.store.pipe(select(selectValidationErrors));
  }

  public ngOnInit(): void {
    this.initForms();
    this.subscribeToLoading();
  }

  private initForms(): void {
    this.personalForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      patronymic: ['']
    });

    this.contactForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      username: ['', Validators.required]
    });

    this.passwordForm = this.formBuilder.group({
      oldPassword: ['', Validators.required],
      newPassword: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    }, { validators: this.passwordMatchValidator });
  }

  private subscribeToLoading(): void {
    this.isSubmitting$.pipe(untilDestroyed(this)).subscribe(isSubmitting => {
      Object.keys(this.loading).forEach((keyЖ) => {
        this.loading[key] = isSubmitting;
      });
    });
  }

  private passwordMatchValidator(form: FormGroup) {
    const newPassword = form.get('newPassword')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;

    return newPassword === confirmPassword ? null : { passwordMismatch: true };
  }

  public toggleEdit(section: string): void {
    this.editMode[section] = !this.editMode[section];

    if (this.editMode[section]) {
      // Заполняем форму текущими данными при открытии редактирования
      this.currentUser$.pipe(untilDestroyed(this)).subscribe(user => {
        if (user) {
          switch (section) {
            case 'personal':
              this.personalForm.patchValue({
                firstName: user.firstName,
                lastName: user.lastName,
                patronymic: user.patronymic
              });
              break;
            case 'contact':
              this.contactForm.patchValue({
                email: user.email,
                username: user.username
              });
              break;
          }
        }
      });
    }
  }

  public cancelEdit(section: string): void {
    this.editMode[section] = false;
    this.clearFormErrors(section);
  }

  private clearFormErrors(section: string): void {
    switch (section) {
      case 'personal':
        this.personalForm.setErrors(null);
        break;
      case 'contact':
        this.contactForm.setErrors(null);
        break;
      case 'password':
        this.passwordForm.setErrors(null);
        break;
    }
  }

  public savePersonal(): void {
    if (this.personalForm.invalid) {
      this.personalForm.markAllAsTouched();
      return;
    }

    this.store.dispatch(updateName(this.personalForm.value));
    this.editMode.personal = false;
  }

  public saveContact(): void {
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      return;
    }

    this.store.dispatch(updateEmail(this.contactForm.value));
    this.store.dispatch(updateUsername(this.contactForm.value));
    this.editMode.contact = false;
  }

  public savePassword(): void {
    if (this.passwordForm.invalid) {
      this.passwordForm.markAllAsTouched();
      return;
    }

    const { oldPassword, newPassword } = this.passwordForm.value;
    this.store.dispatch(updatePassword({ oldPassword, newPassword }));
    this.editMode.password = false;
    this.passwordForm.reset();
  }

  public getErrorsFor(controlName: string): ValidationErrors | null {
    const control = this.personalForm.get(controlName) ||
      this.contactForm.get(controlName) ||
      this.passwordForm.get(controlName);

    if (control && control.touched) {
      return control.errors;
    }

    return null;
  }
}
