import { Component, inject, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { filter } from 'rxjs';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { IUserInfo } from '@api/user/user.interface';
import { selectCurrentUser } from '../auth/store/auth.selectors';

@UntilDestroy()
@Component({
    selector: 'banking-profile',
    standalone: false,
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
    private readonly store = inject(Store);

    public readonly currentUser$ = this.store.pipe(select(selectCurrentUser));
    public user: IUserInfo | null = null;

    public ngOnInit(): void {
        this.currentUser$.pipe(
            filter(currentUser => !!currentUser),
            untilDestroyed(this)
        ).subscribe(user => {
            this.user = user;
        });
    }

    public onPersonalInfoSave(data: any): void {
        // this.store.dispatch(updateName(data));
        // this.user = { ...this.user!, ...data };
    }

    public onContactInfoSave(data: any): void {
        // this.store.dispatch(updateEmail(data));
        // this.store.dispatch(updateUsername(data));
        // this.user = { ...this.user!, ...data };
    }

    public onSecuritySave(data: { oldPassword: string; newPassword: string }): void {
        // this.store.dispatch(updatePassword(data));
    }
}
