import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UiModule } from '../ui/ui.module';
import { HomeComponent } from './home/home.component';
import { HomeService } from './home/home.service';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    data: {
      breadcrumb: 'Home',
    },
  },
  {
    path: 'formbuilder',
    loadChildren: () =>
      import('./form/form.module').then((m) => m.FormModule),
    data: {
      breadcrumb: 'Form builder',
    },
  },
  { path: '', redirectTo: 'home', pathMatch: 'prefix' },
];

@NgModule({
  imports: [
    UiModule,
    RouterModule.forChild(routes),
    // StateModule.forChild<HomeState>({
    //   selector: 'home',
    //   state: {
    //     pagination: {}
    //   },
    // }),
  ],
  declarations: [HomeComponent],
  providers: [HomeService],
})
export class AppModulesModule {
  constructor() {}
}
