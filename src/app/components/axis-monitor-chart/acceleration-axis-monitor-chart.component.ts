import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { DeviceMotion, DeviceMotionAccelerationData } from '@ionic-native/device-motion/ngx';
import { XAxis, YAxis } from '@progress/kendo-angular-charts';
import { Axis } from 'src/app/components/axis-monitor-chart/acceleration-axis-monitor-chart.model';
import { Subscription } from 'rxjs';
import { AlertsService } from '../../services/alerts.service';

@Component({
  selector: 'app-acceleration-axis-monitor-chart',
  templateUrl: './acceleration-axis-monitor-chart.component.html',
  styleUrls: ['./acceleration-axis-monitor-chart.component.scss'],
})
export class AccelerationAxisMonitorChartComponent implements OnChanges {

  @Input() updateFrequency = 10;
  @Input() axis: Axis = Axis.eX;
  @Input() timeInterval = 5000;
  private maxMeasurePoints = 0;
  private deviceAccelerationWatchSub: Subscription;

  public chartName = `Chart`;

  public xAxisConfig: XAxis = {
    min: 0,
    max: this.maxMeasurePoints,
    baseUnit: 'milliseconds',
    name: 'Time in millisecons'
  };

  public yAxisConfig: YAxis = {
    min: -15,
    max: 15,
  };

  public chartData = [];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.timeInterval || changes.updateFrequency || changes.axis) {
      this.init();
    }
  }

  init(): void {
    this.maxMeasurePoints = this.timeInterval / this.updateFrequency;
    this.chartName = `Chart for measuring ${this.axis} axis over ${this.timeInterval}ms`;
    this.chartData = [];

    // Init the chart with a straight line
    for (let i = 0; i <= this.maxMeasurePoints; i++) {
      this.chartData.push([i, 0]);
    }

    this.xAxisConfig = {
      min: 0,
      max: this.maxMeasurePoints,
      baseUnit: 'milliseconds',
      name: 'Time in millisecons'
    };

    this.yAxisConfig = {
      min: -15,
      max: 15,
    };

    if (this.deviceAccelerationWatchSub) {
      this.deviceAccelerationWatchSub.unsubscribe();
    }

    // Watch device acceleration
    this.deviceAccelerationWatchSub = this.deviceMotion.watchAcceleration({ frequency: this.updateFrequency })
      .subscribe((newAcceleration: DeviceMotionAccelerationData) => {
        this.updateChart(newAcceleration[this.axis]);
      });
  }

  constructor(private deviceMotion: DeviceMotion, public alertService: AlertsService) {
    this.init();
  }

  updateChart(newValue): void {
    // Shift all the points back
    for (const point of this.chartData) {
      point[0]--;
    }
    this.chartData.push([this.maxMeasurePoints, newValue]); // Add a new point
    this.chartData.shift(); // Remove the first point

    this.chartData = this.chartData.slice();  // Update the chart reference to update the data binding

    this.alertService.onChartDataUpdated(this.axis, this.chartData, this.timeInterval, this.updateFrequency);
  }

}
