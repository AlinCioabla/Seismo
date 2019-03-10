import { Component } from '@angular/core';
import { ShakeService } from '../services/shake.service';
import { ShakeEvent } from '../models/shake-event.model';

import * as AccelerationAxisModel from 'src/app/components/axis-monitor-chart/acceleration-axis-monitor-chart.model';
import { ModalController } from '@ionic/angular';
import { SettingsModalComponent } from 'src/app/components/settings-modal/settings-modal.component';

@Component({
  selector: 'app-live-preview',
  templateUrl: 'live-preview.page.html',
  styleUrls: ['live-preview.page.scss']
})
export class LivePreviewPage {
  AccelerationAxisModel = AccelerationAxisModel;

  public chartTimeInterval = 5000; // ms
  public chartUpdateFrequency = 10;

  constructor(private shakeService: ShakeService, public modalController: ModalController) {
  }

  async onSettingsClick() {
    const modal = await this.modalController.create({
      component: SettingsModalComponent,
      componentProps: {
        chartTimeInterval: this.chartTimeInterval,
        chartUpdateFrequency: this.chartUpdateFrequency
      }
    });
    await modal.present();
    const returnedData = await modal.onDidDismiss();

    this.chartTimeInterval = returnedData.data.chartTimeInterval;
    this.chartUpdateFrequency = returnedData.data.chartUpdateFrequency;
  }

}
