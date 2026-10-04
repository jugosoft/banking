import {
    ChangeDetectionStrategy,
    Component,
    DestroyRef,
    inject,
    OnInit,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';

/**
 * Компонент детализации инвестиционного продукта
 */
@Component({
    selector: 'banking-invest',
    standalone: false,
    templateUrl: './invest.component.html',
    // styleUrl: './invest.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InvestComponent implements OnInit {
    public id: number | null = null;
    private readonly activatedRoute = inject(ActivatedRoute);
    private readonly destroyRef = inject(DestroyRef);

    public ngOnInit(): void {
        this.bindRoute();
    }

    private bindRoute(): void {
        this.activatedRoute.params.pipe(
            takeUntilDestroyed(this.destroyRef),
        ).subscribe({
            next: (params) => {
                this.id = params['id'];
            },
        });
    }
}
