import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ConfirmDeleteDialogComponent } from './confirm-delete-dialog/confirm-delete-dialog.component';

@NgModule({
    declarations: [
        ConfirmDeleteDialogComponent
    ],
    imports: [CommonModule, ReactiveFormsModule],
    exports: [
        CommonModule,
        ReactiveFormsModule,
        ConfirmDeleteDialogComponent
    ],
})
export class SharedModule { }
