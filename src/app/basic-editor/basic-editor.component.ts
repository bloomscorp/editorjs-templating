import {AfterViewInit, Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import EditorJS, {OutputData, ToolConstructable} from '@editorjs/editorjs';

import Header from '@editorjs/header';

//@ts-ignore
import NestedList from '@editorjs/nested-list';
//@ts-ignore
import Table from '@editorjs/table';


@Component({
  selector: 'app-basic-editor',
  templateUrl: './basic-editor.component.html',
  styleUrls: ['./basic-editor.component.scss']
})
export class BasicEditorComponent implements OnInit, AfterViewInit {

  @Output() generatedJsonDataFromEditor: EventEmitter<OutputData> = new EventEmitter<OutputData>();
  @ViewChild('editor', {read: ElementRef, static: true})
  private editorElement: ElementRef = {} as ElementRef;
  private editor: EditorJS = {} as EditorJS;

  constructor() {
  }

  public ngOnInit(): void {
  }

  public ngAfterViewInit(): void {
    this.initEditor();
  }

  public initEditor(): void {

    this.editor = new EditorJS({
      minHeight: (window.innerHeight),
      holder: this.editorElement.nativeElement,
      tools: {

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
        table: Table as unknown as ToolConstructable,
        list: {
          class: NestedList as unknown as ToolConstructable,
          inlineToolbar: true,
          config: {
            defaultStyle: 'unordered'
          },
        },
      },
    });
  }

  public save(): void {

    this.editor.save().then((data: OutputData) => {
      this.generatedJsonDataFromEditor.emit(data)
    });
  }
}
