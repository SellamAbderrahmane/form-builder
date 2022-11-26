import { NgModule } from "@angular/core"
import { RouterModule, Routes } from "@angular/router"

import { UiModule } from "../ui/ui.module"
import { HomeService } from "./home/home.service"
import { HomeComponent } from "./home/home.component"

const routes: Routes = [
  {
    path: "home",
    component: HomeComponent,
    data: {
      breadcrumb: "Home",
    },
  },
  {
    path: "formbuilder",
    loadChildren: () => import("./forms/forms.module").then((m) => m.FormsModule),
    data: {
      breadcrumb: "Form builder",
    },
  },
  { path: "", redirectTo: "formbuilder", pathMatch: "prefix" },
]

@NgModule({
  imports: [UiModule, RouterModule.forChild(routes)],
  declarations: [HomeComponent],
  providers: [HomeService],
})
export class AppModulesModule {}
