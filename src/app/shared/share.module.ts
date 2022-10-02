import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { ConfirmationModalComponent } from './confirmation-modal/confirmation-modal.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap' ;
import { ToastComponent } from "./toast/toast.component";


@NgModule({
  declarations: [
    ConfirmationModalComponent,
    ToastComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([]),
    NgbModule
  ],
  exports: [ConfirmationModalComponent,ToastComponent]
})
export class SharedModule {}