import { Component, Input, OnInit } from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
    selector: 'keo-loader-button',
    templateUrl: './loader-button.component.html',
    styleUrls: ['./loader-button.component.css'],
    providers: [],
    standalone: true,
    imports: [NgClass]
})
export class LoaderButtonComponent implements OnInit {
    @Input("show-loading") isLoading: boolean = false;
    @Input("size") changeSize: string = "16px";
    @Input("color") changeColor: string = "var(--white)";
    @Input("margin") margin: string = "3px 0 0 8px";
    @Input("disabled") disabled: boolean = false;

    constructor() {}

    ngOnInit(): void {
        this.isLoading = this.isLoading ? this.isLoading : false;
        this.changeColor = this.changeColor ? this.changeColor : "var(--white)";
        this.disabled = this.disabled ? this.disabled : false;
    }
}