import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FORM_COMPONENTS, TableCellRender, UI_COMPONENTS } from './components';
import { ErrorPageComponent } from './pages/error.component';
import { NzConfig, NZ_CONFIG } from 'ng-zorro-antd/core/config';
import { FormDirective } from './components/forms/form.directive';
import { FileInfoPipe } from './components/upload/upload.pipe';
import { TranslateModule } from '@ngx-translate/core';
import { DragDropManagerService, UI_DIRECTIVES, UI_PIPES } from './directives_pipes';
import { NzModule } from './nz.module';

const ngZorroConfig: NzConfig = {
  message: { nzTop: 0 },
  notification: { nzTop: 240 },
};

@NgModule({
  imports: [
    NzModule,
    FormsModule,
    CommonModule,
    DragDropModule,
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
  providers: [DragDropManagerService, { provide: NZ_CONFIG, useValue: ngZorroConfig }],
  exports: [
    NzModule,
    FormsModule,
    CommonModule,
    DragDropModule,
    ErrorPageComponent,
    ReactiveFormsModule,
    TranslateModule,
    ...UI_COMPONENTS,
    ...UI_DIRECTIVES,
    ...UI_PIPES,
  ],
})
export class UiModule {}
