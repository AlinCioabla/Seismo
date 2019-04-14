import { Component } from '@angular/core';
import { WebsocketService } from '../services/websocket.service';

@Component({
  selector: 'app-alerts',
  templateUrl: 'alerts.page.html',
  styleUrls: ['alerts.page.scss']
})
export class AlertsPage {
  constructor(public websocketService: WebsocketService) {
    this.websocketService.listen().subscribe(newMessage => {
      console.log(newMessage);
    })
  }

  public onConnect() {
    this.websocketService.connectWebsocket();
  }

  public onDisconnect() {
    this.websocketService.disconnectWebsocket();
  }

  public onSendMessage() {
    this.websocketService.sendMessage('alinnn');
  }

}
