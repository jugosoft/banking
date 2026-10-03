import {
    Directive,
    EventEmitter,
    HostListener,
    Input,
    Output,
    OnInit,
    inject,
} from '@angular/core';
import { DestroyRef } from '@angular/core';
import {
    takeUntilDestroyed,
} from '@angular/core/rxjs-interop';
import { debounceTime, filter, map, Subject } from 'rxjs';
import { EVENT_SCROLL, EVENT_PATH_SCROLL, IScroll } from './scroll.constants';

/**
 * Директива для отслеживания скролла и уведомления когда пользователь достигает конца списка.
 * Emit событие scrollEnd когда scrollY + offsetHeight >= scrollHeight.
 */
@Directive({
    selector: '[appScrollTrigger]',
    standalone: true,
})
export class ScrollTriggerDirective implements OnInit {
    @Input() public offset = 0;
    @Input() public debounceTime = 0;
    @Input() public disabledScroll = false;
    @Output() public scrollEnd = new EventEmitter<void>();

    public readonly scroll$ = new Subject<IScroll>();

    private readonly destroyRef = inject(DestroyRef);

    public ngOnInit(): void {
        this.scroll$
            .pipe(
                debounceTime(this.debounceTime),
                map((scroll: IScroll) => {
                    const y = scroll.y + this.offset;
                    return { y, height: scroll.height };
                }),
                filter(() => !this.disabledScroll),
                filter((scroll: IScroll) => scroll.y >= scroll.height),
                takeUntilDestroyed(this.destroyRef),
            )
            .subscribe({
                next: () => this.scrollEnd.emit(),
            });
    }

    @HostListener(EVENT_SCROLL, EVENT_PATH_SCROLL)
    public onScroll(scrollY: number, scrollHeight: number, offsetHeight: number): void {
        const height = scrollHeight;
        const y = scrollY + offsetHeight;
        this.scroll$.next({ y, height });
    }
}
