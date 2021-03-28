import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AdminComponent} from './admin.component';
import {AddPageComponent} from './add-page/add-page.component';
import {EditPageComponent} from './edit-page/edit-page.component';
import {LoginPageComponent} from './login-page/login-page.component';
import {PageNotFoundComponent} from '../shared/page-not-found/page-not-found.component';

const routes: Routes = [
  {path: '', component: AdminComponent},
  {path: 'add', component: AddPageComponent},
  {path: 'edit', component: EditPageComponent},
  {path: 'login', component: LoginPageComponent},
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {
}
