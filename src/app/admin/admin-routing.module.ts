import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { AddPageComponent } from './add-page/add-page.component';
import { EditPageComponent } from './edit-page/edit-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { PageNotFoundComponent } from '../shared/components/page-not-found/page-not-found.component';
import { DashboardPageComponent } from './dashboard-page/dashboard-page.component';
import { CategoryPageComponent } from './category-page/category-page.component';
import { AuthGuard } from '../shared/services/auth.guard';

const routes: Routes = [
  {
    path: '', component: AdminComponent, children: [
      {path: '', component: DashboardPageComponent, data: {title: 'Dashboard'}, canActivate: [AuthGuard]},
      {path: 'add', component: AddPageComponent, data: {title: 'Adding'}, canActivate: [AuthGuard]},
      {path: 'edit/:id', component: EditPageComponent, canActivate: [AuthGuard]},
      {path: 'categories', component: CategoryPageComponent, canActivate: [AuthGuard]},
      {path: 'login', component: LoginPageComponent}
    ]
  },
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {
}
