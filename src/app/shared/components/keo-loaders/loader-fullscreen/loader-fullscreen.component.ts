import { Component, Input, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'keo-loader-fullscreen',
    templateUrl: './loader-fullscreen.component.html',
    styleUrls: ['./loader-fullscreen.component.scss'],
    providers: [],
    standalone: true
})
export class LoaderFullScreenComponent implements OnInit {
    @Input("show-loading") isLoading: boolean = false;
    @Input("text") text: string = "";

    public readonly BASE_TRANSLATE_SHARED_LOADER = "shared.loader";

    constructor(
        private translate: TranslateService
    ) {}

    ngOnInit(): void {
        this.isLoading = this.isLoading ? this.isLoading : false;
        this.text = this.text ? this.text : this.translate.instant(`${this.BASE_TRANSLATE_SHARED_LOADER}.text_loading`);
    }
}