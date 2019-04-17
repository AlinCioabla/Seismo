import { Injectable } from '@angular/core';
import { DeviceMotionAccelerationData } from '@ionic-native/device-motion/ngx';
import { Axis } from '../components/axis-monitor-chart/acceleration-axis-monitor-chart.model';
import { WebsocketService } from './websocket.service';
import { WsMessage } from '../models/ws-message.model';

@Injectable()
export class AlertsService {

  private sensitivity = 2;
  //private shakeDetected = new Subject<ShakeEvent>();

  private previousAcceleration = {
    x: null,
    y: null,
    z: null
  };

  constructor(public wsService: WebsocketService) {

  }

  public onChartDataUpdated(axis: Axis, chartData: Array<[number, number]>, timeInterval: number, updateFrequency: number) {
    if (this.wsService.connected())
      this.wsService.sendMessage(JSON.stringify(new WsMessage(axis, chartData, timeInterval, updateFrequency)));
  }

  private onAccelerationChanged(newAcceleration: DeviceMotionAccelerationData) {
    const accelerationChange = {
      x: 0,
      y: 0,
      z: 0
    };

    if (this.previousAcceleration.x) {
      accelerationChange.x = Math.abs(this.previousAcceleration.x - newAcceleration.x);
      accelerationChange.y = Math.abs(this.previousAcceleration.y - newAcceleration.y);
      accelerationChange.z = Math.abs(this.previousAcceleration.z - newAcceleration.z);
    }

    this.previousAcceleration = {
      x: newAcceleration.x,
      y: newAcceleration.y,
      z: newAcceleration.z
    };

    if (accelerationChange.x + accelerationChange.y + accelerationChange.z > this.sensitivity) {
      // this.shakeDetected.next(new ShakeEvent(
      //   newAcceleration.x, newAcceleration.y, newAcceleration.z, newAcceleration.timestamp
      // ));
    }
  }

}