import { Component } from '@angular/core';
import { BankingUiModule } from './modules/banking-ui/banking-ui.module';

@Component({
  selector: 'banking-root',
  standalone: true,
  imports: [
    BankingUiModule
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent  {
  
}
