
import { AfterViewInit, Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import EditorJS, { OutputData, ToolConstructable } from '@editorjs/editorjs';
// import Table, { TableToolConfig } from '@editorjs/table';
//* //@ts-ignore  *//
import Header from '@editorjs/header';

//@ts-ignore
import Table from '@editorjs/table';
import { BmxToastService } from 'bmx-toast';


@Component({
  selector: 'app-basic-editor',
  templateUrl: './basic-editor.component.html',
  styleUrls: ['./basic-editor.component.scss']
})
export class BasicEditorComponent implements OnInit, AfterViewInit {
  constructor(
    public _toastService: BmxToastService
  ) { }
  @Output() generatedJsonDataFromEditor = new EventEmitter<OutputData>();
  @ViewChild('editor', { read: ElementRef, static: true })
  private editorElement: ElementRef = {} as ElementRef;

  private editor: EditorJS = {} as EditorJS;

  public ngOnInit(): void { }

  public ngAfterViewInit(): void {
    this.initiEditor()
  }

  public initiEditor(): void {
    this.editor = new EditorJS({
      minHeight: (window.innerHeight),
      holder: this.editorElement.nativeElement,
      tools: {
        // header: Header,
        paragraph: {
          config: {
            placeholder: 'Tell your story..'
          }
        },

        header: {
          class: Header as unknown as ToolConstructable,
          inlineToolbar: ['bold', 'italic'],
          config: {
            placeholder: 'Title of your story'
          }
        },
        table: Table as unknown as ToolConstructable
      },
    });
  }

  public save(): void {
    this.editor.save().then((data: OutputData) => {
      // debugger
      console.log(data);
      this.generatedJsonDataFromEditor.emit(data);
      if (data['blocks'].length > 0) {
        this._toastService.generate({
          type: 'success',
          toastHeading: 'JSON generated successfully',
          toastText: 'JSON is generated, Now you can copy it anytime.',
          position: 'bottom-center',
          autoClose: true,
          progressbar: true
        });
      }
      else {
        this._toastService.generate({
          type: 'warning',
          toastHeading: 'JSON not generated',
          toastText: 'Please Provide Data in the Editor to Generate JSON.',
          position: 'bottom-center',
          autoClose: true,
          progressbar: true
        });
      }
    });

  }
}
