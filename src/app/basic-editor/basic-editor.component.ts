import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import EditorJS, { OutputData, ToolConstructable } from '@editorjs/editorjs';

import Header from '@editorjs/header';

//@ts-ignore
import NestedList from '@editorjs/nested-list';
//@ts-ignore
import Table from '@editorjs/table';
//@ts-ignore
import ImageTool from '@editorjs/image';
//@ts-ignore
import Checklist from '@editorjs/checklist';
//@ts-ignore
import CodeTool from '@editorjs/code';
import { StoreBannerPayloadService } from '../validation/service/store-banner-payload.service';

@Component({
  selector: 'app-basic-editor',
  templateUrl: './basic-editor.component.html',
  styleUrls: ['./basic-editor.component.scss'],
})
export class BasicEditorComponent implements OnInit, AfterViewInit {
  @Output() generatedJsonDataFromEditor: EventEmitter<OutputData> =
    new EventEmitter<OutputData>();
  @ViewChild('editor', { read: ElementRef, static: true })
  private editorElement: ElementRef = {} as ElementRef;
  private editor: EditorJS = {} as EditorJS;
  public isGenerateButtonVisible: boolean = false;

  constructor(private _storeBannerPayloadService: StoreBannerPayloadService) {}

  public ngOnInit(): void {}

  public ngAfterViewInit(): void {
    this.initEditor();
  }

  public initEditor(): void {
    //@ts-ignore
    const AlignmentTuneTool = require('editorjs-text-alignment-blocktune');

    this.editor = new EditorJS({
      minHeight: window.innerHeight,
      holder: this.editorElement.nativeElement,
      tools: {
        paragraph: {
          tunes: ['anyTuneName'],
          config: {
            placeholder: 'Tell your story..',
          },
        },

        header: {
          class: Header as unknown as ToolConstructable,
          inlineToolbar: ['bold', 'italic'],
          tunes: ['anyTuneName'],
          config: {
            placeholder: 'Title of your story',
          },
        },

        anyTuneName: {
          class: AlignmentTuneTool,
          config: {
            default: 'left',
            blocks: {
              header: 'center',
              list: 'right',
            },
          },
        },

        table: Table as unknown as ToolConstructable,

        list: {
          class: NestedList as unknown as ToolConstructable,
          inlineToolbar: true,
          config: {
            defaultStyle: 'ordered',
          },
        },

        image: {
          class: ImageTool,
          config: {
            endpoints: {
              byFile: 'http://localhost:4200/uploadFile', // Your backend file uploader endpoint
              byUrl: 'http://localhost:4200/fetchUrl', // Your endpoint that provides uploading by Url
            },
          },
        },

        checklist: {
          class: Checklist,
          inlineToolbar: true,
        },

        code: CodeTool,
      },
      onChange: (): void => {
        this.editor.save().then((data: OutputData): void => {
          if (data.blocks && data.blocks.length > 0) {
            this.isGenerateButtonVisible = true;
          } else {
            this.generatedJsonDataFromEditor.emit({} as OutputData);
            this.isGenerateButtonVisible = false;
          }
        });
      },
    });
  }

  public save(): void {
    this.editor.save().then((data: OutputData): void => {

      let bannerData = this._storeBannerPayloadService.storeBannerPayload;
      data.blocks.splice(0, 0, bannerData);

      this.generatedJsonDataFromEditor.emit(data);
    });
  }
}
