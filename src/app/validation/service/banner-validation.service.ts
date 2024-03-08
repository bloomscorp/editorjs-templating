import { Injectable } from '@angular/core';
import { OutputData } from '@editorjs/editorjs';

@Injectable({
  providedIn: 'root'
})
export class BannerValidationService {

  constructor() { }

  public bannerValidationErrorMessage: string = '';

  public validate(jsonData: OutputData): boolean {

    if(!this._isBannerExist(jsonData)){

      this.bannerValidationErrorMessage = 'Please Provide Banner image in the Editor.';
      return false;
    }

    if(!this._isBannerExistOnTop(jsonData)){

      this.bannerValidationErrorMessage = 'Please Provide the banner on the top of Editor.';
      return false;
    }

    if(!this._isBannerImageEmpty(jsonData)){

      this.bannerValidationErrorMessage = 'Please Provide the banner image name or link.';
      return false;
    }

    return true;
  }

  private _isBannerExist(jsonData: OutputData): boolean {

    let isBannerExist: boolean = false;

    for(let i: number = 0; i < jsonData.blocks.length; i++){

      if(jsonData.blocks[i].type === 'banner'){

        isBannerExist= true;
        break
      }
      else isBannerExist= false;
    }
    return isBannerExist;
  }

  private _isBannerExistOnTop(jsonData: OutputData): boolean {

    return jsonData.blocks[0].type === 'banner';
  }

  private _isBannerImageEmpty(jsonData: OutputData): boolean {
    return jsonData.blocks[0].type === 'banner' && jsonData.blocks[0].data.link !== '';
  }
}
