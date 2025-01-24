import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
    selector: 'keo-policy-privacy',
    templateUrl: './policy-privacy.container.html',
    styleUrls: ['./policy-privacy.container.scss'],
    standalone: true
})
export class PolicyPrivacyContainer implements OnInit {
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