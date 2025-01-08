import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../material/material.module';
import { SharedModule } from '../shared.module';

@Component({
  selector: 'banking-deposit-card',
  standalone: true,
  imports: [CommonModule, MaterialModule, SharedModule],
  templateUrl: './deposit-card.component.html',
  styleUrl: './deposit-card.component.scss',
})
export class DepositCardComponent {}
