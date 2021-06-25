import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {SignalRService} from './services/signalr.service';
import {PrivateSignalRService} from './services/private-signal-r.service';
import {ExampleOneComponent} from './components/example-one/example-one.component';
import {ExampleTwoComponent} from './components/example-two/example-two.component';

@NgModule({
  declarations: [
    AppComponent,
    ExampleOneComponent,
    ExampleTwoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [{
    provide: SignalRService,
    useClass: PrivateSignalRService
  }],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {
  }
}
