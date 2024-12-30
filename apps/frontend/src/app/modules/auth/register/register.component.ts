import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'banking-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterComponent implements OnInit {
  public formGroup!: FormGroup;

  // private readonly formBuilder = inject(FormBuilder);
  constructor(private readonly formBuilder: FormBuilder) {}

  public ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      email: this.formBuilder.control(null, Validators.required),
      password: this.formBuilder.control(null, Validators.required),
    });

    console.log(this.formGroup.value);
  }
}
