import { NgModule } from "@angular/core"
import { RouterModule, Routes } from "@angular/router"

import { StateModule } from "src/app/state"
import { UiModule } from "src/app/ui/ui.module"
import { AbilityModule } from "src/app/shared/ability/ability.module"

import { FormComponent } from "./form.component"
import { FORM_COMPONENTS } from "./components"
import { FORM_DIRECTIVES } from "./directives"
import { FormService } from "./services/form.service"
import { initialState } from "./form.state"
import { FormConfigService } from "./services/config.service"
import { DragDropManagerService } from "./directives/dragDropManager.directive"

const routes: Routes = [
  {
    path: "",
    component: FormComponent,
    data: {
      breadcrumb: null,
    },
  },
]

@NgModule({
  imports: [
    UiModule,
    AbilityModule.forChild(),
    StateModule.forChild<any>({
      selector: "form",
      state: initialState,
    }),
    RouterModule.forChild(routes),
  ],
  declarations: [...FORM_COMPONENTS, ...FORM_DIRECTIVES, FormComponent],
  providers: [DragDropManagerService, FormService, FormConfigService],
})
export class FormModule {
  constructor(private configservice: FormConfigService) {
    this.configservice.init()
  }
}
