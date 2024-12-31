import { inject, Injectable } from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarRef,
  TextOnlySnackBar,
} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private readonly snackBar = inject(MatSnackBar);

  public error(
    message: string,
    action?: string
  ): MatSnackBarRef<TextOnlySnackBar> {
    return this.snackBar.open(message, action);
  }
}
