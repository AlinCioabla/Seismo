import { DeviceMotion, DeviceMotionAccelerationData } from '@ionic-native/device-motion/ngx';
import { Observable, Subject } from 'rxjs';
import { ShakeEvent } from 'src/app/models/shake-event.model';
import { Injectable } from '@angular/core';

@Injectable()
export class ShakeService {
  private sensitivity = 2;
  private frequency = 100;
  private shakeDetected = new Subject<ShakeEvent>();

  private previousAcceleration = {
    x: null,
    y: null,
    z: null
  };

  constructor(private deviceMotion: DeviceMotion) {
    // Watch device acceleration
    this.deviceMotion.watchAcceleration({ frequency: this.frequency })
      .subscribe((newAcceleration: DeviceMotionAccelerationData) => {
        this.onAccelerationChanged(newAcceleration);
      });
  }

  public listen(): Observable<ShakeEvent> {
    return this.shakeDetected.asObservable();
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
      this.shakeDetected.next(new ShakeEvent(
        newAcceleration.x, newAcceleration.y, newAcceleration.z, newAcceleration.timestamp
      ));
    }
  }
}
