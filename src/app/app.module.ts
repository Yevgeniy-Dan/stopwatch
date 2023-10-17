import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { AppComponent } from './app.component';
import { ControlButtonComponent } from './components/control-button/control-button.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TimeDisplayComponent } from './components/time-display/time-display.component';

@NgModule({
  declarations: [AppComponent, ControlButtonComponent, TimeDisplayComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatIconModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
