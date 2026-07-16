import { inject, Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { defer, Observable } from 'rxjs';
import { ConfirmDeleteModalComponent, ConfirmModalData } from '../confirm-delete-modal';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private readonly dialog = inject(MatDialog);

  /**
   * Открыть модальное окно подтверждения удаления с ленивой загрузкой
   */
  public openConfirmDeleteModal(data: ConfirmModalData): Observable<boolean> {
    return defer(() => this.loadModalAndOpen(data));
  }

  /**
   * Ленивая загрузка модального компонента и открытие диалога
   */
  private async loadModalAndOpen(data: ConfirmModalData): Promise<boolean> {
    const { ConfirmDeleteModalComponent } = await import(
      '../confirm-delete-modal'
    );

    const dialogRef: MatDialogRef<ConfirmDeleteModalComponent, boolean> = this.dialog.open(
      ConfirmDeleteModalComponent,
      {
        data,
        width: '400px'
      }
    );

    return dialogRef.afterClosed().toPromise() as Promise<boolean>;
  }
}
