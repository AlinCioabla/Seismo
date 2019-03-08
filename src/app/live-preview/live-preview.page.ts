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

  constructor(private shakeService: ShakeService) {
    this.shakeService.listen().subscribe((shakeEvent: ShakeEvent) => {
      this.lastShake = shakeEvent;
    });
  }

}
