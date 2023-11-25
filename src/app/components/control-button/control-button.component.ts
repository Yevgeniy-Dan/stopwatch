/**
 A button component that can take on different values
 */
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-control-button',
  templateUrl: './control-button.component.html',
  styleUrls: ['./control-button.component.css'],
})
export class ControlButtonComponent {
  /** button icon */
  @Input() icon!: string;

  /** emit event when button clicked */
  @Output() btnClick = new EventEmitter<string>();

  /**
   * emit event method
   */
  onClick() {
    this.btnClick.emit();
  }
}
