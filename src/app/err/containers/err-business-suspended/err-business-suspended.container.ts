import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgStyle } from '@angular/common';

@Component({
    selector: 'keo-err-business-suspended',
    templateUrl: './err-business-suspended.container.html',
    standalone: true,
    imports: [NgStyle, RouterLink]
})
export class ErrBusinessSuspendedContainer {}