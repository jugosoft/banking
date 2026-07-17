import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { IInvestListItem } from '@api/invest';
import { CardLayoutComponent } from '../layouts/card-layout/card-layout.component';
import { MaterialModule } from '../../material/material.module';

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

    public formatDate(date: Date): string {
        const d = new Date(date);
        return `${d.getDate().toString().padStart(2, '0')}.${(d.getMonth() + 1).toString().padStart(2, '0')}.${d.getFullYear()}`;
    }

    public onDelete(): void {
        this.delete.emit(this.invest.id);
    }

    public editInvest(): void {
        void 0;
    }
}
