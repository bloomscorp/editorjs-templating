import { Injectable } from '@angular/core';
import { OutputData } from '@editorjs/editorjs';
import { HeadingValidationService } from './heading-validation.service';
import { ParagraphValidationService } from './paragraph-validation.service';

@Injectable({
  providedIn: 'root'
})
export class PrepareValidationService {

  constructor(
    private _validateHeading: HeadingValidationService,
    private _validateParagraph: ParagraphValidationService
  ) { }

  public validationMessage: string = '';
  public validateJsonData(jsonData: OutputData): boolean {

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
}
