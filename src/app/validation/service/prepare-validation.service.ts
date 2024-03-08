import { Injectable } from '@angular/core';
import { BlockToolData, OutputData } from '@editorjs/editorjs';
import { HeadingValidationService } from './heading-validation.service';
import { ParagraphValidationService } from './paragraph-validation.service';
import { BannerValidationService } from './banner-validation.service';
import { StoreBannerPayloadService } from './store-banner-payload.service';

@Injectable({
  providedIn: 'root'
})
export class PrepareValidationService {

  constructor(
    private _validateHeading: HeadingValidationService,
    private _validateParagraph: ParagraphValidationService,
    private _validateBanner: BannerValidationService,
    private _storeBanner: StoreBannerPayloadService

  ) { }

  public validationMessage: string = '';
  public validateJsonData(jsonData: OutputData): boolean {

    // this._pushBannerData(jsonData);

    if(!this._validateBanner.validate(jsonData)){

      this.validationMessage = this._validateBanner.bannerValidationErrorMessage;
      return false;
    }

    if(!this._validateHeading.validate(jsonData)){

      this.validationMessage = this._validateHeading.headingValidationErrorMessage;
      return false;
    }

    if(!this._validateParagraph.validate(jsonData)){

      this.validationMessage = this._validateParagraph.paragraphValidationErrorMessage;
      return false;
    }

    this.validationMessage = '';
    return true
  }

  // private _pushBannerData(jsonData: OutputData): void {

  //   let bannerData: BlockToolData = this._storeBanner.storeBannerPayload;
  //   jsonData.blocks.splice(0, 0, bannerData);
  //   // console.log(jsonData);
  // }
}
