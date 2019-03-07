import { DeviceMotionAccelerationData } from '@ionic-native/device-motion/ngx';

export class ShakeEvent implements DeviceMotionAccelerationData {
  x: number;
  y: number;
  z: number;
  timestamp: any;

  constructor(x: number, y: number, z: number, timestamp: number) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.timestamp = timestamp;
  }
}
