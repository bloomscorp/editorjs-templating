import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {OutputData} from '@editorjs/editorjs';

@Component({
  selector: 'app-json-viewer',
  templateUrl: './json-viewer.component.html',
  styleUrls: ['./json-viewer.component.scss']
})
export class JsonViewerComponent implements OnChanges, OnInit {
  @Input() dataPassFromHolder: OutputData = {} as OutputData;

  public dataStringify: string = '';
  public hideCopy: boolean = false;
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
      this.hideCopy = true;

    } else {

      this.dataStringify = this.emptyMessage;
      this.hideCopy = false;
    }
  }

  public copy(): void {
    navigator.clipboard.writeText(this.dataStringify).then();
  }

}
