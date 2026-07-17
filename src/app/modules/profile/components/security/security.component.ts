import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProfileSectionLayoutComponent } from 'src/app/modules/shared/layouts/profile-section-layout/profile-section-layout.component';

@Component({
  selector: 'banking-security',
  standalone: false,
  templateUrl: './security.component.html',
  styleUrl: './security.component.scss',
})
export class SecurityComponent {
  @Output() save = new EventEmitter<{ oldPassword: string; newPassword: string }>();

  public isEditing = false;
  public passwordForm!: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.initForm();
  }

  private initForm(): void {
    this.passwordForm = this.formBuilder.group(
      {
        oldPassword: this.formBuilder.control('', Validators.required),
        newPassword: this.formBuilder.control('', Validators.required),
        confirmPassword: this.formBuilder.control('', Validators.required),
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

  public saveInfo(): void {
    if (this.passwordForm.invalid) {
      this.passwordForm.markAllAsTouched();
      return;
    }

    const { oldPassword, newPassword } = this.passwordForm.value;
    this.save.emit({ oldPassword, newPassword });
    this.isEditing = false;
    this.passwordForm.reset();
  }
}
