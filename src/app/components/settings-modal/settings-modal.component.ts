import { Component, OnInit } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';
import { ViewController } from '@ionic/core';

@Component({
  selector: 'app-settings-modal',
  templateUrl: './settings-modal.component.html',
  styleUrls: ['./settings-modal.component.scss'],
})
export class SettingsModalComponent implements OnInit {
  public chartUpdateFrequency = 100;
  public chartTimeInterval = 100;

  constructor(navParams: NavParams, private modalCtrl: ModalController) {
    this.chartUpdateFrequency = navParams.data.chartUpdateFrequency;
    this.chartTimeInterval = navParams.data.chartTimeInterval;
  }

  dismiss() {
    this.modalCtrl.dismiss({
      chartUpdateFrequency: this.chartUpdateFrequency,
      chartTimeInterval: this.chartTimeInterval
    });
  }

  ngOnInit() { }

}
