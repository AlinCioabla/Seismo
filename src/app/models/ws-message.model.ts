import { Axis } from '../components/axis-monitor-chart/acceleration-axis-monitor-chart.model';

export enum WsMessageType {
  eAlert = 'Alert',
  eDataUpdated = 'DataUpdated'
}

export class ChartData {
  data: Array<[number, number]> = [];
  timeIntervalMs = 0;
  updateFrequencyMs = 0;
  axis: Axis;

  constructor(axis: Axis, chartData: Array<[number, number]>, timeIntervalMs: number, updateFrequencyMs: number) {
    this.axis = axis;
    this.data = chartData;
    this.timeIntervalMs = timeIntervalMs;
    this.updateFrequencyMs = updateFrequencyMs;
  }}

export class WsMessage {
  type: WsMessageType = WsMessageType.eDataUpdated;
  data: ChartData;

  constructor(axis: Axis, chartData: Array<[number, number]>, timeIntervalMs: number, updateFrequency: number) {
    this.data = new ChartData(axis, chartData, timeIntervalMs, updateFrequency);
  }

}