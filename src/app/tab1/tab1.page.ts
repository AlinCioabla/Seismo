import { Component } from '@angular/core';
import { DeviceMotion, DeviceMotionAccelerationData } from '@ionic-native/device-motion/ngx';
import { ShakeService } from '../services/shake.service';
import { ShakeEvent } from '../models/shake-event.model';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  public lastShake: ShakeEvent = new ShakeEvent(0, 0, 0, 0);

  constructor(private shakeService: ShakeService) {
    this.shakeService.listen().subscribe((shakeEvent: ShakeEvent) => {
      this.lastShake = shakeEvent;
    });
  }

}
