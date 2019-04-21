import { Axis } from '../components/axis-monitor-chart/acceleration-axis-monitor-chart.model';

export enum WsMessageType {
  eAlert = 'Alert',
  eDataUpdated = 'DataUpdated'
}

export class Point {
  x: number = 0;
  y: number = 0;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
}

export class ChartData {
  data: Array<Point> = [];
  timeIntervalMs = 0;
  updateFrequencyMs = 0;
  axis: Axis;

  constructor(axis: Axis, chartData: Array<Array<number>>, timeIntervalMs: number, updateFrequencyMs: number) {
    this.axis = axis;

    for (const pointArray of chartData) {
      this.data.push(new Point(pointArray[0], pointArray[1]));
    }

    this.timeIntervalMs = timeIntervalMs;
    this.updateFrequencyMs = updateFrequencyMs;
  }
}

export class WsMessage {
  type: WsMessageType = WsMessageType.eDataUpdated;
  data: ChartData;

  constructor(axis: Axis, chartData: Array<Array<number>>, timeIntervalMs: number, updateFrequency: number) {
    this.data = new ChartData(axis, chartData, timeIntervalMs, updateFrequency);
  }

}