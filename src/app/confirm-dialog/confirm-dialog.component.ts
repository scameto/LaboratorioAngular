import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent {
  @Input() message: string = '';
  @Output() confirmAction = new EventEmitter<boolean>();
  visible: boolean = false;

  show() {
    this.visible = true;
  }

  hide() {
    this.visible = false;
  }

  confirm(result: boolean) {
    this.confirmAction.emit(result);
    this.hide();
  }
}
