import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BasicEditorComponent } from './basic-editor/basic-editor.component';
import { JsonViewerComponent } from './json-viewer/json-viewer.component';
import { ValidationComponent } from './validation/validation/validation.component';
@NgModule({
  declarations: [
    AppComponent,
    BasicEditorComponent,
    JsonViewerComponent,
    ValidationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
