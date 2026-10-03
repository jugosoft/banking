import {
    Component,
    inject,
    Input,
    OnInit,
    Output,
    EventEmitter,
} from '@angular/core';
import { BehaviorSubject, finalize, Observable, switchMap } from 'rxjs';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { AsyncPipe } from '@angular/common';

/**
 * Базовый generic-компонент для списков с пагинацией и бесконечным скроллом.
 * Переопределите getItems$(page, size, filter) и onDeleteItem(id) в потомках.
 */
@Component({
    selector: 'app-base-list',
    template: `
        @if (isLoading$ | async) {
        <div class="base-list__loading">
            <mat-spinner></mat-spinner>
        </div>
        } @else {
        <div class="base-list__container">
            <ng-content select="[header]"></ng-content>
            <ng-content select="[filters]"></ng-content>

            @if (items$.value.length === 0) {
            <ng-content select="[empty-state]"></ng-content>
            }

            <ng-content></ng-content>

            @if (isLoadingMore) {
            <div class="base-list__loader">
                <mat-spinner diameter="40"></mat-spinner>
            </div>
            }
        </div>
        }
    `,
    styles: [`
        :host {
            display: block;
        }

        .base-list__container {
            padding: 16px;
            padding-bottom: 80px;
        }

        .base-list__loading {
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 40px;
        }

        .base-list__loader {
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 16px;
        }
    `],
    standalone: true,
    imports: [
        AsyncPipe,
        MatProgressSpinner,
    ]
})
export class BaseListComponent<T, F> implements OnInit {
    protected readonly isLoading$ = new BehaviorSubject<boolean>(false);
    protected readonly items$ = new BehaviorSubject<T[]>([]);

    // Пагинация
    @Input() public pageSize = 10;
    protected currentPage = 0;
    protected hasMore = true;
    public isLoadingMore = false;

    // Фильтр
    @Input() public filter!: F;

    @Output() public readonly itemDeleted = new EventEmitter<number>();

    public ngOnInit(): void {
        this.loadItems();
    }

    public loadItems(): void {
        this.isLoading$.next(true);
        this.currentPage = 0;
        this.hasMore = true;
        this.getItems().pipe(
            finalize(() => this.isLoading$.next(false))
        ).subscribe({
            next: response => {
                this.items$.next(response.items);
                this.hasMore = response.hasMore;
                this.currentPage = response.page + 1;
            }
        });
    }

    public loadMoreItems(): void {
        if (this.isLoadingMore || !this.hasMore) {
            return;
        }

        this.isLoadingMore = true;
        this.getItems(this.currentPage).pipe(
            finalize(() => this.isLoadingMore = false)
        ).subscribe({
            next: response => {
                const currentItems = this.items$.value;
                this.items$.next([...currentItems, ...response.items]);
                this.hasMore = response.hasMore;
                this.currentPage = response.page + 1;
            }
        });
    }

    /**
     * Загрузить элементы (переопределить в потомке)
     */
    protected getItems(page: number = 0): Observable<{ items: T[]; hasMore: boolean; page: number }> {
        throw new Error('getItems must be overridden');
    }

    /**
     * Удалить элемент (переопределить в потомке)
     */
    protected deleteItem(id: number): Observable<boolean> {
        throw new Error('deleteItem must be overridden');
    }

    public onDelete(id: number): void {
        this.isLoading$.next(true);
        this.deleteItem(id).pipe(
            switchMap(() => this.getItems()),
            finalize(() => this.isLoading$.next(false))
        ).subscribe({
            next: response => {
                this.items$.next(response.items);
                this.hasMore = response.hasMore;
                this.currentPage = response.page + 1;
            }
        });
    }
}
