import { Component, Input, SimpleChanges } from '@angular/core';
import { OutputData } from '@editorjs/editorjs';
import { BmxToastService } from 'bmx-toast';

@Component({
	selector: 'app-json-viewer',
	templateUrl: './json-viewer.component.html',
	styleUrls: ['./json-viewer.component.scss']
})
export class JsonViewerComponent {
	constructor(
		public _toastService: BmxToastService
	) { }

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
		if (this.dataPassFromHolder.blocks && this.dataPassFromHolder.blocks.length > 0) {
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
		this._toastService.generate({
			type: 'success',
			toastHeading: 'JSON copied successfully',
			toastText: 'JSON is copied, Now you can paste it anywhere.',
			position: 'bottom-center',
			autoClose: true,
			progressbar: true
		});
	}
}
