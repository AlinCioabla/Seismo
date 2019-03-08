import { Component, OnInit, Input } from '@angular/core';
import { DeviceMotion, DeviceMotionAccelerationData } from '@ionic-native/device-motion/ngx';



// Must match the DeviceMotionAccelerationData members (names)
export enum Axis {
  eX = 'x',
  eY = 'y',
  eZ = 'z'
}

@Component({
  selector: 'app-acceleration-axis-monitor-chart',
  templateUrl: './acceleration-axis-monitor-chart.component.html',
  styleUrls: ['./acceleration-axis-monitor-chart.component.scss'],
})
export class AccelerationAxisMonitorChartComponent {
  @Input() frequency = 10;
  @Input() axis: Axis = Axis.eX;
  @Input() maxUpdates = 500;

  public chartData = [];

  constructor(private deviceMotion: DeviceMotion) {
    for (let i = 0; i < this.maxUpdates; i++) {
      this.chartData.push([i, 0]);
    }

    // Watch device acceleration
    this.deviceMotion.watchAcceleration({ frequency: this.frequency })
      .subscribe((newAcceleration: DeviceMotionAccelerationData) => {
        this.updateChart(newAcceleration[this.axis]);
      });
  }

  updateChart(newValue): void {
    this.chartData.splice(0, 1);
    this.chartData.map(point => point[0]--);

    this.chartData.push([this.maxUpdates, newValue]);
    this.chartData = this.chartData.slice();
  }

}
