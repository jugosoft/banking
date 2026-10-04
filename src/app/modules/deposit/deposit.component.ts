import {
    ChangeDetectionStrategy,
    Component,
    DestroyRef,
    inject,
    OnInit,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'banking-deposit',
    standalone: true,
    imports: [],
    templateUrl: './deposit.component.html',
    styleUrl: './deposit.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DepositComponent implements OnInit {
    public id: number | null = null;
    private readonly destroyRef = inject(DestroyRef);
    private readonly activatedRoute = inject(ActivatedRoute);

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
