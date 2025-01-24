import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
    selector: 'keo-terms-conditions',
    templateUrl: './terms-conditions.container.html',
    styleUrls: ['./terms-conditions.container.scss'],
    standalone: true
})
export class TermsConditionsContainer implements OnInit {
    public readonly BASE_TRANSLATE_SHARED = 'shared';
    @ViewChild('top', { static: false }) top!: ElementRef;

    constructor() {}

    ngOnInit(): void {
        setTimeout(() => {
            this.goToTop();
        }, 200);
    }

    goToTop() {
        this.top.nativeElement.scrollIntoView({
            behavior: 'smooth'
        });
    }
}