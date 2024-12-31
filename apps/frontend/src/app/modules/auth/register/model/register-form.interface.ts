import { FormControl } from '@angular/forms';

export interface IRegisterForm {
  email: FormControl<string | null>;
  username: FormControl<string | null>;
  password: FormControl<string | null>;
  passwordRepeat: FormControl<string | null>;
}
