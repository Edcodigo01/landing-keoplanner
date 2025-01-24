import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'keo-err-404',
    templateUrl: './err-404.container.html',
    standalone: true,
    imports: [RouterLink]
})
export class Err404Container {}