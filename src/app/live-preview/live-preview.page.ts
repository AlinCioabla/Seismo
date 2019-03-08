import { Component } from '@angular/core';
import { ShakeService } from '../services/shake.service';
import { ShakeEvent } from '../models/shake-event.model';

@Component({
  selector: 'app-live-preview',
  templateUrl: 'live-preview.page.html',
  styleUrls: ['live-preview.page.scss']
})
export class LivePreviewPage {
  public lastShake: ShakeEvent = new ShakeEvent(0, 0, 0, 0);

  zAcceleration = [
    [0, -5], [1, 5], [2, 0], [3, 0],
    [4, 0], [5, 0], [6, 0], [7, -3],
    [8, 3], [9, 6], [10, 10], [11, 5],
    [12, -13], [13, -3], [14, 16], [15, 1],
    [16, 19], [17, 1], [18, 20], [19, -2],
    [20, -18], [21, 5], [22, -12], [23, 7],
    [24, 10], [25, -8]
  ];

  constructor(private shakeService: ShakeService) {
    this.shakeService.listen().subscribe((shakeEvent: ShakeEvent) => {
      this.lastShake = shakeEvent;
    });
  }

}
