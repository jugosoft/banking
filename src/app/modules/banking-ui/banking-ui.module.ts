import { NgModule } from '@angular/core';
import { WrapperComponent } from './wrapper/wrapper.component';
import { SharedModule } from '../shared/shared.module';
import { FooterComponent } from './footer/footer.component';
import { MaterialModule } from '../material/material.module';
import { AuthRoutingModule } from "../auth/auth-routing.module";

@NgModule({
    declarations: [WrapperComponent, FooterComponent],
    imports: [SharedModule, MaterialModule],
    exports: [WrapperComponent, FooterComponent],
})
export class BankingUiModule { }
