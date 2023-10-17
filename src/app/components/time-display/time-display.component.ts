/**
 * component responsible for displaying timing
 * */
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-time-display',
  templateUrl: './time-display.component.html',
  styleUrls: ['./time-display.component.css'],
})
export class TimeDisplayComponent {
  /**input time value in HH:MM:SS format */
  @Input() time?: string;
}
