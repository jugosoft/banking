import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { IInvestListItem } from '@api/invest';
import { CardLayoutComponent } from '../layouts/card-layout/card-layout.component';
import { MaterialModule } from '../../material/material.module';
import { Router } from '@angular/router';
import { ModalService } from '../modal/modal.service';
import { filter } from 'rxjs';
import { ConfirmModalData } from '../confirm-delete-modal';

@Component({
  selector: 'banking-invest-card',
  standalone: true,
  templateUrl: './invest-card.component.html',
  styleUrl: './invest-card.component.scss',
  imports: [CurrencyPipe, MaterialModule, CardLayoutComponent],
})
export class InvestCardComponent {
  @Input() public invest!: IInvestListItem;
  @Output() public readonly delete = new EventEmitter<number>();
  private readonly router = inject(Router);
  private readonly modalService = inject(ModalService);

  public formatDate(date: Date): string {
    const d = new Date(date);
    return `${d.getDate().toString().padStart(2, '0')}.${(d.getMonth() + 1).toString().padStart(2, '0')}.${d.getFullYear()}`;
  }

  public onDelete(): void {
    const modalData: ConfirmModalData = {
      title: 'Подтверждение удаления',
      message: 'Вы уверены, что хотите удалить этУ поганую инвестицию?',
      confirmText: 'Удалить',
      cancelText: 'Отмена'
    };

    this.modalService.openConfirmDeleteModal(modalData).pipe(
      filter(result => !!result)
    ).subscribe(() => {
      this.delete.emit(this.invest.id);
    });
  }

  public editInvest(): void {
    void this.router.navigate(['/invest', 'edit', this.invest.id]);
  }
}
