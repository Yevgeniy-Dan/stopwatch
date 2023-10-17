/**
 This service manages a timer, providing methods
 to start, stop, wait and reset it, and also tracks double clicks
 on the "waitBtn" button to stop the timer 
 */

import { Injectable } from '@angular/core';
import { Observable, timer, Subject, fromEvent } from 'rxjs';
import { takeUntil, map, filter, buffer, debounceTime } from 'rxjs/operators';

import { convertTime } from '../utils/utils';

@Injectable({
  providedIn: 'root',
})
export class TimerService {
  /** amount of time in seconds */
  time: number = 0;
  /** emit event with stop trggier */
  private stop$ = new Subject<void>();

  constructor() {}

  /**
   * Start the timer from the time it was stopped
   * The method monitors and assigns a new value to the "time" variable every second
   * and returns time in HH:MM:SS format
   *
   */
  public start(): Observable<string> {
    return timer(0, 1000).pipe(
      map(() => {
        this.time++;
        return convertTime(this.time);
      }),
      takeUntil(this.stop$)
    );
  }

  /**
   * Stop the timer
   *
   */
  public stop(): void {
    this.stop$.next();
  }

  /**tracks double clicks
    on the "waitBtn" button to stop the timer  */
  public wait(): void {
    const waitBtn = document.getElementById('waitBtn');
    if (waitBtn) {
      const buttonClick$ = fromEvent(waitBtn, 'click');

      // tracks double clicks with an interval of less than 300 ms, then stop the timer
      buttonClick$
        .pipe(
          buffer(buttonClick$.pipe(debounceTime(300))),
          filter((clicks) => clicks.length >= 2)
        )
        .subscribe(() => this.stop$.next());
    }
  }

  /**
   * Reset the timer and stop it after
   *
   */
  public reset(): string {
    this.stop();

    // Reset time property in order to start over
    this.time = 0;
    return convertTime(this.time);
  }
}
