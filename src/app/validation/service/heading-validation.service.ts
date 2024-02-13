import { Injectable } from '@angular/core';
import { OutputData } from '@editorjs/editorjs';

@Injectable({
  providedIn: 'root'
})
export class HeadingValidationService {

  constructor() { }

  public headingValidationErrorMessage: string = '';
  public validate(jsonData: OutputData): boolean {

    if(!this._isHeadingExist(jsonData)){

      this.headingValidationErrorMessage = 'Please Provide Heading in the Editor.';
      return false;
    }

    if(!this._isHeadingExistOnTop(jsonData)){

      this.headingValidationErrorMessage = 'Please Provide the Heading on the top of Editor.';
      return false;
    }

    this.headingValidationErrorMessage = '';
    return true;
  }

  private _isHeadingExist(jsonData: OutputData): boolean {

    let isHeadingExist: boolean = false;

    for(let i: number = 0; i < jsonData.blocks.length; i++){

      if(jsonData.blocks[i].type === 'header'){

        isHeadingExist= true;
        break
      }
      else isHeadingExist= false;
    }
    return isHeadingExist;
  }

  private _isHeadingExistOnTop(jsonData: OutputData): boolean {

    return jsonData.blocks[0].type === 'header';
  }
}
