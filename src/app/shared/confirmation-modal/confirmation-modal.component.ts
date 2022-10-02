
import { Component, EventEmitter, Injectable, Input, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { NgbModal, NgbModalConfig, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-confirmation-modal',
  templateUrl: './confirmation-modal.component.html',
  styleUrls: ['./confirmation-modal.component.css'],
  providers: [NgbModalConfig, NgbModal]

})

export class ConfirmationModalComponent implements OnInit {
  @ViewChild('confirmationModal') private modalContent!: TemplateRef<ConfirmationModalComponent>

  // declared attributes of component
  @Output() newConfirmationEvent = new EventEmitter<string>();
  @Input() modalStyle: any;
  @Input() modalTitle: any;
  @Input() modalBody: any;
  @Input() modalButtonColor: any;

  private modalRef!: NgbModalRef;


  constructor(config: NgbModalConfig, private modalService: NgbModal) {
    config.backdrop = false;
    config.keyboard = false;
   }

  ngOnInit(): void {
  }


  open(): Promise<boolean> {
    return new Promise<boolean>(resolve => {
      this.modalRef = this.modalService.open(this.modalContent, { centered : true });
      this.modalRef.result.then((result) => {
        console.log(result);
        this.newConfirmationEvent.emit(result);
      }, (reason) => {
        console.log(reason);
      });
    })
  }

}
