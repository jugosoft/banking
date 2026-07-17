import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { RouterLink } from "@angular/router";

@NgModule({
    declarations: [],
    imports: [CommonModule, ReactiveFormsModule, MatIconModule, MatButtonModule, RouterLink],
    exports: [
        CommonModule,
        ReactiveFormsModule,
        MatButtonModule,
        RouterLink,
    ],
    providers: []
})
export class SharedModule { }
