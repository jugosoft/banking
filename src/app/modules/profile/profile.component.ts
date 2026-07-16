import { Component, inject, OnInit } from '@angular/core';
import {
    FormBuilder,
    FormGroup,
    ValidationErrors,
    Validators,
} from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { filter, Observable } from 'rxjs';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { ProfileService } from './services/profile.service';
import { IUserInfo } from '@api/user/user.interface';
import { selectCurrentUser } from '../auth/store/auth.selectors';

@UntilDestroy()
@Component({
    selector: 'banking-profile',
    standalone: false,
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
    private readonly store = inject(Store);

    public readonly currentUser$ = this.store.pipe(select(selectCurrentUser));
    // public readonly isSubmitting$ = this.store.pipe(select(selectIsSubmitting));
    // public readonly validationErrors$ = this.store.pipe(select(selectValidationErrors));
    private readonly formBuilder = inject(FormBuilder);
    public personalForm!: FormGroup;
    public contactForm!: FormGroup;
    public passwordForm!: FormGroup;

    public isEditing = false;
    public user: IUserInfo | null = null;

    public ngOnInit(): void {
        this.initForms();

        this.currentUser$.pipe(
            filter(currentUser => !!currentUser),
            untilDestroyed(this)
        ).subscribe(user => {
            this.user = user;
            if (user) {
                this.personalForm.patchValue({
                    firstName: user.firstName || '',
                    lastName: user.lastName || '',
                    patronymic: user.patronymic || '',
                });
                this.contactForm.patchValue({
                    email: user.email || '',
                    username: user.name || '',
                });
            }
        });
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

    private passwordMatchValidator(form: FormGroup) {
        const newPassword = form.get('newPassword')?.value;
        const confirmPassword = form.get('confirmPassword')?.value;

        return newPassword === confirmPassword
            ? null
            : { passwordMismatch: true };
    }

    public toggleEdit(): void {
        this.isEditing = !this.isEditing;
    }

    public savePersonal(): void {
        if (this.personalForm.invalid) {
            this.personalForm.markAllAsTouched();
            return;
        }

        // this.store.dispatch(updateName(this.personalForm.value));
        this.isEditing = false;
    }

    public saveContact(): void {
        if (this.contactForm.invalid) {
            this.contactForm.markAllAsTouched();
            return;
        }

        // this.store.dispatch(updateEmail(this.contactForm.value));
        // this.store.dispatch(updateUsername(this.contactForm.value));
        this.isEditing = false;
    }

    public savePassword(): void {
        if (this.passwordForm.invalid) {
            this.passwordForm.markAllAsTouched();
            return;
        }

        const { oldPassword, newPassword } = this.passwordForm.value;
        // this.store.dispatch(updatePassword({ oldPassword, newPassword }));
        this.isEditing = false;
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
