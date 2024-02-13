import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {OutputData} from '@editorjs/editorjs';
import { PrepareValidationService } from '../validation/service/prepare-validation.service';

@Component({
  selector: 'app-json-viewer',
  templateUrl: './json-viewer.component.html',
  styleUrls: ['./json-viewer.component.scss']
})
export class JsonViewerComponent implements OnChanges, OnInit {

  constructor(
    private _prepareValidation: PrepareValidationService
  ) { }
  @Input() dataPassFromHolder: OutputData = {} as OutputData;

  public dataStringify: string = '';
  public isCopyButtonVisible: boolean = false;
  public isValidationMessageVisible: boolean = false;
  public validationMessage: string = '';
  private emptyMessage: string = 'Please Provide Data in the Editor to Generate JSON.';

  public ngOnInit(): void {

    if (JSON.stringify(this.dataPassFromHolder) != '{}') {
      this.dataStringify = JSON.stringify(this.dataPassFromHolder, undefined, 2);
    } else {
      this.dataStringify = this.emptyMessage;
    }
  }

  public ngOnChanges(changes: SimpleChanges): void {

    if (
      this.dataPassFromHolder.blocks &&
      this.dataPassFromHolder.blocks.length > 0
    ) {

      this.dataPassFromHolder = changes['dataPassFromHolder'].currentValue;

      this.dataStringify = JSON.stringify(this.dataPassFromHolder, undefined, 2);


      if(!this._prepareValidation.validateJsonData(this.dataPassFromHolder)){

        this.isCopyButtonVisible = false;
        this.isValidationMessageVisible = true;
        this.validationMessage = this._prepareValidation.validationMessage;
        return
      }

      this.isCopyButtonVisible = true;
      this.isValidationMessageVisible = false;

    } else {

      this.dataStringify = this.emptyMessage;
      this.isCopyButtonVisible = false;
    }
  }

  public copy(): void {
    navigator.clipboard.writeText(this.dataStringify).then();
  }

}
