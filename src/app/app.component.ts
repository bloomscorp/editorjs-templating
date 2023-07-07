import { Component, Input } from '@angular/core';
import { OutputData } from '@editorjs/editorjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public title = 'editorjs';
  @Input() dataHolder:OutputData = {} as OutputData;

  public pushData(data:OutputData): void {
    this.dataHolder = data;
    // console.log(this.dataHolder);
  }
}
