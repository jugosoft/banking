import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BankingUiModule } from './modules/banking-ui/banking-ui.module';
import { AuthModule } from './modules/auth/auth.module';

@Component({
  selector: 'banking-root',
  standalone: true,
  imports: [BankingUiModule, RouterModule, AuthModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {}
