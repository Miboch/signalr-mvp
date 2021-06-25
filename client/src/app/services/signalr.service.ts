import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {SignalEvent} from '../interfaces/signal-event';
import {SignalEventType} from '../interfaces/signal-event-type';

@Injectable()
export abstract class SignalRService {
  abstract getDataStream<TDataShape>(...filterValues: SignalEventType[]): Observable<SignalEvent<TDataShape>>
}
