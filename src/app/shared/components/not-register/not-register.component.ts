import { Component, Input } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'keo-not-register',
  templateUrl: './not-register.component.html',
  styleUrls: ['./not-register.component.scss'],
  standalone: true,
  imports: [TranslateModule],
})
export class NotRegisterComponent {
  public readonly BASE_TRANSLATE_SHARED = 'shared.table';

  @Input() isTable: boolean = true;
  @Input() text: string = '';
}
