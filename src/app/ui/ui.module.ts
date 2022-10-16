import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FORM_COMPONENTS, TableCellRender, UI_COMPONENTS } from './components';
import { ErrorPageComponent } from './pages/error.component';
import { NzModule } from './nz.module';
import { NzConfig, NZ_CONFIG } from 'ng-zorro-antd/core/config';
import { FormDirective } from './components/forms/form.directive';
import { FileInfoPipe } from './components/upload/upload.pipe';
import { TranslateModule } from '@ngx-translate/core';
import { UI_DIRECTIVES, UI_PIPES } from './directives_pipes';

const ngZorroConfig: NzConfig = {
  message: { nzTop: 0 },
  notification: { nzTop: 240 },
};

@NgModule({
  imports: [
    NzModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    TranslateModule,
  ],
  declarations: [
    ErrorPageComponent,
    FormDirective,
    FileInfoPipe,
    ...UI_COMPONENTS,
    ...UI_DIRECTIVES,
    ...UI_PIPES,
  ],
  entryComponents: [...FORM_COMPONENTS, TableCellRender],
  providers: [{ provide: NZ_CONFIG, useValue: ngZorroConfig }],
  exports: [
    NzModule,
    FormsModule,
    CommonModule,
    ErrorPageComponent,
    ReactiveFormsModule,
    TranslateModule,
    ...UI_COMPONENTS,
    ...UI_DIRECTIVES,
    ...UI_PIPES,
  ],
})
export class UiModule {}
