import { Component } from '@angular/core';
import { StoreBannerPayloadService } from '../validation/service/store-banner-payload.service';

@Component({
  selector: 'app-banner-editor',
  templateUrl: './banner-editor.component.html',
  styleUrls: ['./banner-editor.component.scss'],
})
export class BannerEditorComponent {

  public isBannerEditorVisible: boolean = false;
  constructor(
    private _storeBannerPayloadService: StoreBannerPayloadService
  ){

  }
  public bannerImageName: string = '';
  public isTheImageExternal: boolean = false;
  public isBannerNameEmpty: boolean = false;

  public addBannerImage(): void {

    if(this.bannerImageName === '') {
      this.isBannerNameEmpty = true;
      return;
    }
    else this.isBannerNameEmpty = false;

    this._storeBannerPayloadService.storeBannerPayload = {
      id: '12345',
      type: 'banner',
      data: {
        link: this.bannerImageName,
        isExternal: this.isTheImageExternal,
      },
      tunes: {
        anyTuneName: {
          alignment: 'center',
        },
      },
    };

    this.closeBannerEditor();
  }

  public openBannerEditor(): void {
    this.isBannerEditorVisible = true;
  }
  public closeBannerEditor(): void {
    this.isBannerEditorVisible = false;
  }
}
