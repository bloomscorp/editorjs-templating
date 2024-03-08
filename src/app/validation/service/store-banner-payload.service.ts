import { Injectable } from '@angular/core';
import { BlockToolData, OutputData } from '@editorjs/editorjs';

@Injectable({
  providedIn: 'root',
})
export class StoreBannerPayloadService {
  constructor() {}

  public storeBannerPayload: BlockToolData = {};

}

