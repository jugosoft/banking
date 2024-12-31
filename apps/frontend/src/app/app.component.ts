import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BankingUiModule } from './modules/banking-ui/banking-ui.module';

@Component({
  selector: 'banking-root',
  standalone: true,
  imports: [BankingUiModule, RouterModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {}
