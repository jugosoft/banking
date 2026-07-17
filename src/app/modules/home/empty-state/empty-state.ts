import { Component, EventEmitter, Output } from '@angular/core';
import { CreateButtonComponent } from "../../banking-ui/create-button/create-button.component";

@Component({
  selector: 'banking-empty-state',
  standalone: true,
  templateUrl: './empty-state.html',
  styleUrl: './empty-state.scss',
})
export class EmptyState {
}
