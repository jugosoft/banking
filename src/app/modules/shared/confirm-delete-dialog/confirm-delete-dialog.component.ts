import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

export interface ConfirmDialogData {
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
}

@Component({
  selector: 'confirm-delete-dialog',
  template: `
    <h2 mat-dialog-title>{{ data.title }}</h2>
    <mat-dialog-content>
      <p>{{ data.message }}</p>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button mat-dialog-close cdkFocusInitial>
        {{ data.cancelText || 'Отмена' }}
      </button>
      <button mat-raised-button color="warn" [mat-dialog-close]="true">
        {{ data.confirmText || 'Удалить' }}
      </button>
    </mat-dialog-actions>
  `,
  styles: [`
    :host {
      display: block;
    }
    
    h2 {
      color: #222831;
      margin-bottom: 16px;
    }
    
    p {
      color: #666666;
      margin: 0;
      line-height: 1.6;
    }
    
    .mat-dialog-actions {
      padding-top: 16px;
    }
    
    .mat-raised-button {
      background-color: #dc3545;
      color: white;
    }
    
    .mat-raised-button:hover {
      background-color: #c82333;
    }
  `]
})
export class ConfirmDeleteDialogComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<ConfirmDeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ConfirmDialogData
  ) {}

  ngOnInit(): void {}
}
