/**
 The main application component containing the start, stop, pause, and reset methods
 */

import { Component } from '@angular/core';
import { Subscription } from 'rxjs';

import { TimerService } from './services/timer.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  /**Application title */
  title: string = 'Stopwatch';

  /** the variable is assigned a value after subscribing to the timer after start */
  subscription!: Subscription;

  time?: string;

  constructor(private timerService: TimerService) {}

  /**Starts a timer by subscribing */
  startTimer(): void {
    this.subscription = this.timerService
      .start()
      .subscribe((value) => (this.time = value));
  }

  /**Stop a timer by double click with an interval of less than 300 ms*/
  waitTimer(): void {
    this.timerService.wait();
  }

  /**Stop a timer */
  stopTimer(): void {
    this.timerService.stop();
  }

  /**Reset timer's value to 00:00:00 */
  resetTimer(): void {
    this.time = this.timerService.reset();
  }
}
