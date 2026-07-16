import { dateDiffInDays } from "src/app/common/utils/date-utils";
import { ConfirmModalData } from "../confirm-delete-modal";
import { Component, EventEmitter, inject, Input, OnInit, Output } from "@angular/core";
import { MaterialModule } from "../../material/material.module";
import { SharedModule } from "../shared.module";
import { IDeposit } from "@api/deposit";
import { ModalService } from "../modal/modal.service";
import { Router } from "@angular/router";
import { filter } from "rxjs";
import { CardLayoutComponent } from "../card-layout/card-layout.component";

@Component({
    selector: 'banking-deposit-card',
    standalone: true,
    templateUrl: './deposit-card.component.html',
    styleUrl: './deposit-card.component.scss',
    imports: [SharedModule, MaterialModule, CardLayoutComponent],
})
export class DepositCardComponent implements OnInit {
    @Input() public deposit!: IDeposit;
    @Output() public delete = new EventEmitter<number>();
    public daysBeforeClose: number | null = null;
    public daysTotal: number | null = null;
    public isClosingSoon = false;
    public progressBarColor: 'primary' | 'accent' | 'warn' = 'primary';
    public progressBarPercentage = 0;

    // Расчётные данные
    public currentAmount: number = 0;
    public interestEarned: number = 0;
    public timeToClose: string = '';

    private readonly router = inject(Router);
    private readonly modalService = inject(ModalService);

    public ngOnInit(): void {
        if (this.deposit.endDate) {
            this.daysBeforeClose = this.getDaysBeforeClose();
            this.daysTotal = this.getDaysTotal();
            this.isClosingSoon = this.getIsClosingSoon();
            this.progressBarPercentage = Math.min(
                ((this.daysTotal - this.daysBeforeClose) / this.daysTotal) * 100,
                100
            );

            // Расчёт текущей суммы и начисленных процентов
            this.calculateDepositDetails();

            // Форматирование времени до закрытия
            this.formatTimeToClose();
        }

        if (this.isClosingSoon) {
            this.progressBarColor = 'warn';
        }
    }

    public editDeposit(): void {
        void this.router.navigate(['/deposit', 'edit', this.deposit.id]);
    }

    public onDelete(): void {
        const modalData: ConfirmModalData = {
            title: 'Подтверждение удаления',
            message: 'Вы уверены, что хотите удалить этот вклад?',
            confirmText: 'Удалить',
            cancelText: 'Отмена'
        };

        this.modalService.openConfirmDeleteModal(modalData).pipe(
            filter(result => !!result)
        ).subscribe((result) => {
            this.delete.emit(this.deposit.id);
        });
    }

    /**
     * Получить число дней до закрытия
     */
    private getDaysBeforeClose(): number {
        return -dateDiffInDays(new Date(this.deposit.endDate!), new Date());
    }

    /**
     * Получить число дней всего
     */
    private getDaysTotal(): number {
        return dateDiffInDays(
            new Date(this.deposit.startDate),
            new Date(this.deposit.endDate!)
        );
    }

    /**
     * Показывать ли, сколько дней осталось до окончания срочного вклада
     */
    private getIsClosingSoon(): boolean {
        return this.daysBeforeClose ? this.daysBeforeClose < 30 : false;
    }

    /**
     * Расчёт текущей суммы и начисленных процентов
     */
    private calculateDepositDetails(): void {
        const startDate = new Date(this.deposit.startDate);
        const endDate = new Date(this.deposit.endDate!);
        const now = new Date();

        // Определяем, сколько дней прошло с момента открытия
        const daysPassed = Math.max(0, dateDiffInDays(startDate, now));
        const totalDays = Math.max(1, dateDiffInDays(startDate, endDate));

        // Рассчитываем текущую сумму (простые проценты)
        // Формула: текущая сумма = начальная сумма + (начальная сумма * ставка * дни / 365 / 100)
        const annualRate = this.deposit.percent;
        const dailyRate = annualRate / 365 / 100;
        const amount = Number(this.deposit.amount) || 0;
        const interest = amount * dailyRate * daysPassed;

        this.currentAmount = amount + interest;
        this.interestEarned = interest;
    }

    /**
     * Форматирование времени до закрытия
     */
    private formatTimeToClose(): void {
        if (this.daysBeforeClose === null) {
            this.timeToClose = '';
            return;
        }

        if (this.daysBeforeClose === 0) {
            this.timeToClose = 'Заканчивается сегодня';
            return;
        }

        if (this.daysBeforeClose === 1) {
            this.timeToClose = 'Заканчивается завтра';
            return;
        }

        if (this.daysBeforeClose < 30) {
            this.timeToClose = `Заканчивается через ${this.daysBeforeClose} дней`;
            return;
        }

        const months = Math.floor(this.daysBeforeClose / 30);
        const days = this.daysBeforeClose % 30;

        if (months === 1 && days === 0) {
            this.timeToClose = 'Заканчивается через 1 месяц';
        } else if (months === 1 && days === 1) {
            this.timeToClose = 'Заканчивается через 1 месяц и 1 день';
        } else if (months === 1) {
            this.timeToClose = `Заканчивается через 1 месяц и ${days} дней`;
        } else if (days === 0) {
            this.timeToClose = `Заканчивается через ${months} месяцев`;
        } else if (days === 1) {
            this.timeToClose = `Заканчивается через ${months} месяцев и 1 день`;
        } else {
            this.timeToClose = `Заканчивается через ${months} месяцев и ${days} дней`;
        }
    }
}
