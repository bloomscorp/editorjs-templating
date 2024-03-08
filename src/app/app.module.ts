import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BasicEditorComponent } from './basic-editor/basic-editor.component';
import { JsonViewerComponent } from './json-viewer/json-viewer.component';
import { ValidationComponent } from './validation/validation/validation.component';
import { BannerEditorComponent } from './banner-editor/banner-editor.component';
import { FormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    AppComponent,
    BasicEditorComponent,
    JsonViewerComponent,
    ValidationComponent,
    BannerEditorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
