import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'banking-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegisterComponent {

}
