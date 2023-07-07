
import { AfterViewInit, Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import EditorJS, { OutputData, ToolConstructable } from '@editorjs/editorjs';
// import Table, { TableToolConfig } from '@editorjs/table';
//* //@ts-ignore  *//
import Header from '@editorjs/header';

//@ts-ignore
import Table from '@editorjs/table';


@Component({
  selector: 'app-basic-editor',
  templateUrl: './basic-editor.component.html',
  styleUrls: ['./basic-editor.component.scss']
})
export class BasicEditorComponent implements OnInit, AfterViewInit {
  constructor() { }
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
        paragraph:{
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
      // console.log(data);
      this.generatedJsonDataFromEditor.emit(data)
    });
  }
}
