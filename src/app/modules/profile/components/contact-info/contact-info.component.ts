import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IUserInfo } from '@api/user/user.interface';

@Component({
  selector: 'banking-contact-info',
  standalone: false,
  templateUrl: './contact-info.component.html',
  styleUrl: './contact-info.component.scss',
})
export class ContactInfoComponent {
  @Input() user: IUserInfo | null = null;
  @Output() save = new EventEmitter<any>();

  public isEditing = false;
  public contactForm!: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.initForm();
  }

  private initForm(): void {
    this.contactForm = this.formBuilder.group({
      email: this.formBuilder.control('', [Validators.required, Validators.email]),
      username: this.formBuilder.control('', Validators.required),
    });
  }

  public toggleEdit(): void {
    this.isEditing = !this.isEditing;
    if (this.user) {
      this.contactForm.patchValue({
        email: this.user.email || '',
        username: this.user.name || '',
      });
    }
  }

  public saveInfo(): void {
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      return;
    }

    this.save.emit(this.contactForm.value);
    this.isEditing = false;
  }

  public resetForm(): void {
    if (this.user) {
      this.contactForm.patchValue({
        email: this.user.email || '',
        username: this.user.name || '',
      });
    }
  }
}
