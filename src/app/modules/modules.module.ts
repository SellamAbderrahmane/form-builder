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
      breadcrumb: 'MENU.HOME',
    },
  },
  {
    path: 'formbuilder',
    loadChildren: () =>
      import('./form/form.module').then((m) => m.FormModule),
    data: {
      breadcrumb: 'MENU.FORM',
    },
  },
  { path: '', redirectTo: 'formbuilder', pathMatch: 'prefix' },
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
