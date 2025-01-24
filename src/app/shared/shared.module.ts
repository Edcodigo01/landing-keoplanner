import { AsyncPipe, CommonModule, NgOptimizedImage } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Title } from '@angular/platform-browser';
import { ModuleWithProviders, NgModule, Provider } from '@angular/core';
import { provideNgxMask } from 'ngx-mask';

@NgModule({
  imports: [CommonModule, FormsModule],
  exports: [FormsModule, ReactiveFormsModule],
})
export class SharedModule {
  public static forRoot(): ModuleWithProviders<SharedModule> {
    return {
      ngModule: SharedModule,
      providers: [MessageService, AsyncPipe, Title, provideNgxMask()],
    };
  }
}
