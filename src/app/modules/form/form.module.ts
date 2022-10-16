import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { StateModule } from 'src/app/state';
import { UiModule } from 'src/app/ui/ui.module';
import { AbilityModule } from 'src/app/shared/ability/ability.module';

import { FormComponent } from './form.component';

const routes: Routes = [
  {
    path: '',
    component: FormComponent,
    data: {
      breadcrumb: null,
    },
  }
];

@NgModule({
  imports: [
    UiModule,
    AbilityModule.forChild(),
    StateModule.forChild<any>({
      selector: 'form',
      state: {},
    }),
    RouterModule.forChild(routes),
  ],
  declarations: [FormComponent],
  providers: [],
})
export class FormModule {}
