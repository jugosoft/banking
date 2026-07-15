import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'banking-empty-state',
  standalone: false,
  templateUrl: './empty-state.html',
  styleUrl: './empty-state.scss',
})
export class EmptyState {
  @Output() createDeposit = new EventEmitter<void>();

  onCreateDeposit(): void {
    this.createDeposit.emit();
  }
}
