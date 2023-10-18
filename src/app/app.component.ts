/**
 The main application component containing the start, stop, pause, and reset methods
 */

import { Component } from '@angular/core';
import { Subject, Subscription, fromEvent, timer } from 'rxjs';
import {
  take,
  takeUntil,
  map,
  filter,
  buffer,
  debounceTime,
} from 'rxjs/operators';
import { convertTime } from './utils/utils';

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

  /** amount of time in seconds */
  time: number = -new Date().getTimezoneOffset();
  /** emit event with stop trggier */
  private stop$ = new Subject<void>();

  constructor() {}

  /**
   * Start the timer from the time it was stopped
   * The method monitors and assigns a new value to the "time" variable every second
   * and returns time in HH:MM:SS format
   *
   */
  startTimer(): void {
    this.subscription = timer(0, 1000)
      .pipe(
        map(() => {
          this.time += 1000;
          return this.time;
        }),
        takeUntil(this.stop$)
      )
      .subscribe(() => {});
  }

  /**Stop a timer by double click with an interval of less than 300 ms*/
  waitTimer(): void {
    const waitBtn = document.getElementById('waitBtn');
    if (waitBtn) {
      const buttonClick$ = fromEvent(waitBtn, 'click');

      // tracks double clicks with an interval of less than 300 ms, then stop the timer
      buttonClick$
        .pipe(
          buffer(buttonClick$.pipe(debounceTime(300))),
          filter((clicks) => clicks.length === 2),
          take(1)
        )
        .subscribe(() => this.stop$.next());
    }
  }

  /**  Stop a timer
   *   tracks double clicks on the "waitBtn" button to stop the timer
   */
  stopTimer(): void {
    this.stop$.next();
    this.subscription.unsubscribe();
  }

  /**Reset timer's value to 00:00:00 */
  resetTimer(): void {
    this.stopTimer();

    // Reset time property in order to start over
    this.time = 0;
  }
}
