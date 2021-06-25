import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {SignalRService} from './signalr.service';
import {Injectable} from '@angular/core';
import {SignalEventType} from '../interfaces/signal-event-type';
import {SignalEvent} from '../interfaces/signal-event';
import {filter} from 'rxjs/operators';
import {HubConnection, HubConnectionBuilder} from '@aspnet/signalr';

@Injectable()
export class PrivateSignalRService extends SignalRService {
  private _signalEvent: Subject<SignalEvent<any>>;
  private _openConnection: boolean = false;
  private _isInitializing: boolean = false;
  private _hubConnection!: HubConnection;

  constructor() {
    super();
    this._signalEvent = new Subject<any>();
    this._isInitializing = true;
    this._initializeSignalR();
  }

  getDataStream<TDataShape>(...filterValues: SignalEventType[]): Observable<SignalEvent<TDataShape>> {
    this._ensureConnection();
    return this._signalEvent.asObservable().pipe(filter(event => filterValues.some(f => f === event.type)));
  }

  private _ensureConnection() {
    if (this._openConnection || this._isInitializing) return;
    this._initializeSignalR();
  }

  private _initializeSignalR() {
    this._hubConnection = new HubConnectionBuilder()
      .withUrl('https://localhost:5001/signalHub')
      .build();
    this._hubConnection.start()
      .then(_ => {
        this._openConnection = true;
        this._isInitializing = false;
        this._setupSignalREvents()
      })
      .catch(error => {
        console.warn(error);
        this._hubConnection.stop().then(_ => {
          this._openConnection = false;
        })
      });

  }

  private _setupSignalREvents() {
    this._hubConnection.on('MessageHelloWorld', (data) => {
      // map or transform your data as appropriate here:
      this._onMessage({type: SignalEventType.EVENT_ONE, data})
    })
    this._hubConnection.on('MessageNumberArray', (data) => {
      // map or transform your data as appropriate here:
      const {numbers} = data;
      this._onMessage({type: SignalEventType.EVENT_TWO, data: numbers})
    })
    this._hubConnection.onclose((e) => this._openConnection = false);
  }

  private _onMessage<TDataShape>(payload: SignalEvent<TDataShape>) {
    this._signalEvent.next(payload);
  }

}
