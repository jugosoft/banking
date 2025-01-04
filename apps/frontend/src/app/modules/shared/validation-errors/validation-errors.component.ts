import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatListModule, MatListItem } from '@angular/material/list';
import { IError, IResponseErrors } from '@banking/shared-types';

@Component({
  selector: 'banking-validation-errors',
  standalone: true,
  imports: [CommonModule, MatListItem, MatListModule],
  templateUrl: './validation-errors.component.html',
  styleUrl: './validation-errors.component.css',
})
export class ValidationErrorsComponent {
  @Input() public validationErrors!: IResponseErrors | null;

  public get errors(): Array<IError> {
    return Object.values(this.validationErrors ?? {});
  }
}
