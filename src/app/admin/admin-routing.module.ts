import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AdminComponent} from './admin.component';
import {AddPageComponent} from './add-page/add-page.component';
import {EditPageComponent} from './edit-page/edit-page.component';
import {LoginPageComponent} from './login-page/login-page.component';
import {PageNotFoundComponent} from '../shared/components/page-not-found/page-not-found.component';
import {DashboardComponent} from './dashboard/dashboard.component';

const routes: Routes = [
  {path: '', component: AdminComponent, children: [
    {path: '', component: DashboardComponent},
      {path: 'add', component: AddPageComponent},
      {path: 'edit', component: EditPageComponent},
      {path: 'login', component: LoginPageComponent}
    ]},
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {
}
