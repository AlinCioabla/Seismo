import { Component } from '@angular/core';
import { WebsocketService } from '../services/websocket.service';

@Component({
  selector: 'app-alerts',
  templateUrl: 'alerts.page.html',
  styleUrls: ['alerts.page.scss']
})
export class AlertsPage {
  constructor(public wsService: WebsocketService) {
  }

  public onConnect() {
    this.wsService.connectWebsocket();
  }

  public onDisconnect() {
    this.wsService.disconnectWebsocket();
  }
}
