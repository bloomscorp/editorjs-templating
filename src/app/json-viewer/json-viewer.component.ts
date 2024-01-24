import { Component, Input, SimpleChanges } from '@angular/core';
import { OutputData } from '@editorjs/editorjs';

@Component({
  selector: 'app-json-viewer',
  templateUrl: './json-viewer.component.html',
  styleUrls: ['./json-viewer.component.scss']
})
export class JsonViewerComponent {
  @Input() dataPassFromHolder: OutputData = {} as OutputData;

  public datastringify = '';
  private emptyMessage = 'Please Provide Data in the Editor to Generate JSON.'

  public hideCopy: boolean = false;

  public ngOnInit(): void {
    if (JSON.stringify(this.dataPassFromHolder) != '{}') {
      this.datastringify = JSON.stringify(this.dataPassFromHolder, undefined, 2);
      // this.datastringify = JSON.stringify(this.dataPassFromHolder, undefined, 2);
    }
    else {
      this.datastringify = this.emptyMessage;
    }
  }

  public ngOnChanges(changes: SimpleChanges) {
    if (this.dataPassFromHolder.blocks.length > 0) {
      this.dataPassFromHolder = changes['dataPassFromHolder'].currentValue;
      this.datastringify = JSON.stringify(this.dataPassFromHolder, undefined, 2);
      this.hideCopy = true;
    }
    else {
      this.datastringify = this.emptyMessage;
      this.hideCopy = false;
    }
  }

  public copy(): void {
    navigator.clipboard.writeText(this.datastringify);
  }

}
