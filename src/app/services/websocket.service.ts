
import { Injectable } from '@angular/core';

import { QueueingSubject } from 'queueing-subject';
import { Subscription, Observable, Subject } from 'rxjs';
import { share, switchMap } from 'rxjs/operators';
import makeWebSocketObservable, {
  GetWebSocketResponses,
  normalClosureMessage,
} from 'rxjs-websockets';

declare type WebSocketPayload = string | ArrayBuffer | Blob;

@Injectable()
export class WebsocketService {
  private readonly kWsAddress = 'ws://192.168.43.5:80';

  // This subject queues as necessary to ensure every message is delivered
  private input: QueueingSubject<string> = new QueueingSubject<string>();

  private socket: any;

  private messages: Observable<WebSocketPayload>;

  private messagesSubscription: Subscription;

  private messageReceived: Subject<any> = new Subject<any>();

  private isConnected = false;

  constructor() {
    // Create the websocket observable, does *not* open the websocket connection
    this.socket = makeWebSocketObservable(this.kWsAddress);
  }

  public connectWebsocket() {
    if (this.isConnected) {
      return;
    }

    this.messages = this.socket.pipe(
      // The observable produces a value once the websocket has been opened
      switchMap((getResponses: GetWebSocketResponses) => {
        console.log('websocket opened');
        this.isConnected = true;
        return getResponses(this.input);
      }),
      share(),
    );

    this.messagesSubscription = this.messages.subscribe(
      (message: string) => {
        console.log('received message:', message);
        this.messageReceived.next(message);
      },
      (error: Error) => {
        this.isConnected = false;
        const { message } = error;
        if (message === normalClosureMessage) {
          console.log('server closed the websocket connection normally');
        } else {
          console.log('socket was disconnected due to error:', message);
        }
        this.messageReceived.error(message);
      },
      () => {
        // The clean termination only happens in response to the last
        // subscription to the observable being unsubscribed, any
        // other closure is considered an error.
        this.isConnected = false;
        console.log('the connection was closed in response to the user');
        this.messageReceived.error('closed by user');
      },
    )
  }

  public connected() {
    return this.isConnected;
  }

  public listen() {
    return this.messageReceived.asObservable();
  }

  public sendMessage(message: any) {
    this.input.next(message);
  }

  public disconnectWebsocket() {
    // This also caused the websocket connection to be closed
    console.log('closing websocket');
    this.messagesSubscription.unsubscribe();
    this.isConnected = false;
  }
}
