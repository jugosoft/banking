import { Component } from '@angular/core';
import { BankingUiModule } from './modules/banking-ui/banking-ui.module';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'banking-root',
  standalone: true,
  imports: [
    BankingUiModule,
    RouterModule
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent  {
  
}
