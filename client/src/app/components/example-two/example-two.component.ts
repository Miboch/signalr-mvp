import {Component, OnDestroy, OnInit} from '@angular/core';
import {SignalRService} from '../../services/signalr.service';
import {SignalEventType} from '../../interfaces/signal-event-type';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-example-two',
  template: `<p>Example Two Component</p>`
})
export class ExampleTwoComponent implements OnInit, OnDestroy {
  subscription!: Subscription;

  constructor(private signal: SignalRService) {
  }

  ngOnInit(): void {
    this.subscription = this.signal.getDataStream<string[]>(SignalEventType.EVENT_TWO).subscribe(message => {
      message.data.forEach(m => console.log(m));
    })
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
