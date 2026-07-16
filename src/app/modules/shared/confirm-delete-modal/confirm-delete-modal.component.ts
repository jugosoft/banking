import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogActions, MatDialogTitle } from '@angular/material/dialog';

export interface ConfirmModalData {
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
}

@Component({
  selector: 'banking-confirm-delete-modal',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, MatDialogModule, MatDialogActions, MatDialogTitle],
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
export class ConfirmDeleteModalComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<ConfirmDeleteModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ConfirmModalData
  ) { }

  ngOnInit(): void { }
}
