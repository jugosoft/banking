import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { RouterLink } from "@angular/router";
import { MatTableModule } from "@angular/material/table";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatSortModule } from "@angular/material/sort";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";

@NgModule({
    declarations: [],
    imports: [CommonModule, ReactiveFormsModule, MatIconModule, MatButtonModule, RouterLink, MatTableModule, MatPaginatorModule, MatSortModule, MatProgressSpinnerModule],
    exports: [
        CommonModule,
        ReactiveFormsModule,
        MatButtonModule,
        RouterLink,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        MatProgressSpinnerModule,
    ],
    providers: []
})
export class SharedModule { }
