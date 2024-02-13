import { Injectable } from '@angular/core';
import { OutputData } from '@editorjs/editorjs';

@Injectable({
  providedIn: 'root'
})
export class ParagraphValidationService {

  constructor() { }

  public paragraphValidationErrorMessage: string = '';
  public validate(jsonData: OutputData): boolean {

    if(!this._isParagraphExist(jsonData)){

      this.paragraphValidationErrorMessage = 'Please Provide a Description / Paragraph in the Editor.';
      return false;
    }

    if(!this._isParagraphBellowTheHeading(jsonData)){
      this.paragraphValidationErrorMessage = 'Please Provide a Description / Paragraph bellow the Heading.';
      return false;
    }

    this.paragraphValidationErrorMessage = '';
    return true;
  }

  private _isParagraphExist(jsonData: OutputData): boolean {

    let isHeadingExist: boolean = false;

    for(let i: number = 0; i < jsonData.blocks.length; i++){

      if(jsonData.blocks[i].type === 'paragraph'){

        isHeadingExist= true;
        break
      }
      else isHeadingExist= false;
    }
    return isHeadingExist;
  }

  private _isParagraphBellowTheHeading(jsonData: OutputData): boolean {

    return jsonData.blocks[1].type === 'paragraph';
  }
}
