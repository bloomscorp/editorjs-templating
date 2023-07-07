import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BasicEditorComponent } from './basic-editor/basic-editor.component';
import { JsonViewerComponent } from './json-viewer/json-viewer.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BmxToastModule } from 'bmx-toast';
@NgModule({
  declarations: [
    AppComponent,
    BasicEditorComponent,
    JsonViewerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    BmxToastModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
