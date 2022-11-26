import { NgModule } from "@angular/core"
import { RouterModule, Routes } from "@angular/router"

import { StoreModule } from "src/app/store"
import { UiModule } from "src/app/ui/ui.module"

import { FORMS_COMPONENTS } from "./components"
import { FORMS_DIRECTIVES } from "./directives"
import { FormsComponent } from "./forms.component"
import { FormsState, initialState } from "./forms.state"
import { FormsConfigService } from "./services/config.service"
import { FormsService } from "./services/forms.service"

const routes: Routes = [
  {
    path: "",
    component: FormsComponent,
    data: {
      breadcrumb: null,
    },
  },
]

@NgModule({
  declarations: [...FORMS_DIRECTIVES, ...FORMS_COMPONENTS, FormsComponent],
  providers: [FormsConfigService, FormsService],
  imports: [UiModule, StoreModule.forChild<FormsState>("forms", initialState), RouterModule.forChild(routes)],
})
export class FormsModule {
  constructor(private configservice: FormsConfigService) {
    this.configservice.init()
  }
}
