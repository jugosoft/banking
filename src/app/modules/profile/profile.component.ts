import { Component, inject, OnInit } from '@angular/core';
import {
    FormBuilder,
    FormGroup,
    ValidationErrors,
    Validators,
} from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ICurrentUser } from '../auth/types';
import { ProfileState } from './store/profile.state';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { ProfileService } from './services/profile.service';
import {
    updateName,
    updateEmail,
    updateUsername,
    updatePassword,
} from './store/profile.actions';
import {
    selectIsSubmitting,
    selectValidationErrors,
} from './store/profile.selectors';
import { selectCurrentUser } from '../auth/store/auth.selectors';

@UntilDestroy()
@Component({
    selector: 'banking-profile',
    standalone: false,
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss'],
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
        password: false,
    };
    public loading = {
        personal: false,
        contact: false,
        password: false,
    };

    private readonly store = inject(Store);
    private readonly profileService = inject(ProfileService);
    private readonly formBuilder = inject(FormBuilder);

    constructor() {
        this.currentUser$ = this.store.pipe(select(selectCurrentUser));
        this.isSubmitting$ = this.store.pipe(select(selectIsSubmitting));
        this.validationErrors$ = this.store.pipe(
            select(selectValidationErrors)
        );
    }

    public ngOnInit(): void {
        this.initForms();
        this.subscribeToLoading();
    }

    private initForms(): void {
        this.personalForm = this.formBuilder.group({
            firstName: this.formBuilder.control('', Validators.required),
            lastName: this.formBuilder.control('', Validators.required),
            patronymic: this.formBuilder.control(''),
        });

        this.contactForm = this.formBuilder.group({
            email: this.formBuilder.control('', [
                Validators.required,
                Validators.email,
            ]),
            username: this.formBuilder.control('', Validators.required),
        });

        this.passwordForm = this.formBuilder.group(
            {
                oldPassword: this.formBuilder.control('', Validators.required),
                newPassword: this.formBuilder.control('', Validators.required),
                confirmPassword: this.formBuilder.control(
                    '',
                    Validators.required
                ),
            },
            { validators: this.passwordMatchValidator }
        );
    }

    private subscribeToLoading(): void {
        this.isSubmitting$
            .pipe(untilDestroyed(this))
            .subscribe((isSubmitting) => {
                Object.keys(this.loading).forEach((key) => {
                    //@ts-ignore
                    this.loading[key] = isSubmitting;
                });
            });
    }

    private passwordMatchValidator(form: FormGroup) {
        const newPassword = form.get('newPassword')?.value;
        const confirmPassword = form.get('confirmPassword')?.value;

        return newPassword === confirmPassword
            ? null
            : { passwordMismatch: true };
    }

    public toggleEdit(section: keyof typeof this.editMode): void {
        this.editMode[section] = !this.editMode[section];

        if (this.editMode[section]) {
            // Заполняем форму текущими данными при открытии редактирования
            this.currentUser$.pipe(untilDestroyed(this)).subscribe((user) => {
                if (user) {
                    switch (section) {
                        case 'personal':
                            this.personalForm.patchValue({
                                firstName: user.firstName,
                                lastName: user.lastName,
                                patronymic: user.patronymic,
                            });
                            break;
                        case 'contact':
                            this.contactForm.patchValue({
                                email: user.email,
                                username: user.username,
                            });
                            break;
                    }
                }
            });
        }
    }

    public cancelEdit(section: keyof typeof this.editMode): void {
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

    public getErrorsFor(
        formGroup: FormGroup,
        controlName: string
    ): ValidationErrors | null {
        const { touched, errors } = formGroup.get(controlName)!;

        if (touched && errors) {
            return errors;
        }

        return null;
    }
}
