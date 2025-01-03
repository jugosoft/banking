import { NgModule } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { SharedModule } from '../shared/shared.module';
import { FooterComponent } from './footer/footer.component';
import { PreviewComponent } from './preview/preview.component';

@NgModule({
  declarations: [HeaderComponent, FooterComponent, PreviewComponent],
  imports: [SharedModule],
  exports: [HeaderComponent, FooterComponent, PreviewComponent],
})
export class BankingUiModule {}
