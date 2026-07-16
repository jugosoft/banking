import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IUserInfo } from '@api/user/user.interface';

@Component({
  selector: 'banking-personal-info',
  standalone: false,
  templateUrl: './personal-info.component.html',
  styleUrl: './personal-info.component.scss',
})
export class PersonalInfoComponent {
  @Input() user: IUserInfo | null = null;
  @Output() save = new EventEmitter<any>();

  public isEditing = false;
  public personalForm!: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.initForm();
  }

  private initForm(): void {
    this.personalForm = this.formBuilder.group({
      firstName: this.formBuilder.control('', Validators.required),
      lastName: this.formBuilder.control('', Validators.required),
      patronymic: this.formBuilder.control(''),
    });
  }

  public toggleEdit(): void {
    this.isEditing = !this.isEditing;
    if (this.user) {
      this.personalForm.patchValue({
        firstName: this.user.firstName || '',
        lastName: this.user.lastName || '',
        patronymic: this.user.patronymic || '',
      });
    }
  }

  public saveInfo(): void {
    if (this.personalForm.invalid) {
      this.personalForm.markAllAsTouched();
      return;
    }

    this.save.emit(this.personalForm.value);
    this.isEditing = false;
  }

  public resetForm(): void {
    if (this.user) {
      this.personalForm.patchValue({
        firstName: this.user.firstName || '',
        lastName: this.user.lastName || '',
        patronymic: this.user.patronymic || '',
      });
    }
  }
}
