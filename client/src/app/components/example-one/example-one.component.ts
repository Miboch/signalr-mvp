import {Component, OnDestroy, OnInit} from '@angular/core';
import {SignalRService} from '../../services/signalr.service';
import {SignalEventType} from '../../interfaces/signal-event-type';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-example-one',
  template: `<p>Example One Component</p>`
})

export class ExampleOneComponent implements OnInit, OnDestroy {
  subscription!: Subscription;
  constructor(private signal: SignalRService) {
  }

  ngOnInit(): void {
    this.subscription = this.signal.getDataStream<string>(SignalEventType.EVENT_ONE).subscribe(message => {
      console.log(message.data);
    })
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
