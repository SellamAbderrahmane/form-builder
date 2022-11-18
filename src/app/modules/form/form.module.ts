import { NgModule } from "@angular/core"
import { RouterModule, Routes } from "@angular/router"

import { StoreModule } from "src/app/store"
import { UiModule } from "src/app/ui/ui.module"
import { AbilityModule } from "src/app/shared/ability/ability.module"

import { initialState } from "./form.state"
import { FORM_DIRECTIVES } from "./directives"
import { FormService } from "./services/form.service"
import { FormConfigService } from "./services/config.service"
import { DragDropManagerService } from "./directives/dragDropManager.directive"

import { FORM_COMPONENTS } from "./components"
import { FormComponent } from "./form.component"

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
  imports: [UiModule, AbilityModule.forChild(), StoreModule.forChild<any>("form", initialState), RouterModule.forChild(routes)],
  declarations: [...FORM_COMPONENTS, ...FORM_DIRECTIVES, FormComponent],
  providers: [DragDropManagerService, FormService, FormConfigService],
})
export class FormModule {
  constructor(private configservice: FormConfigService) {
    this.configservice.init()
  }
}
