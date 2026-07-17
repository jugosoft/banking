import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatIcon } from "@angular/material/icon";

@Component({
  selector: 'banking-create-button',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIcon],
  templateUrl: './create-button.component.html',
  styleUrl: './create-button.component.scss',
})
export class CreateButtonComponent {
  @Input() public route: string | null = null;
  @Input() public icon = '';
  @Output() public readonly click = new EventEmitter<void>();

  public handleClick(): void {
    this.click.emit();
  }
}
