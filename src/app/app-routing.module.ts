import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PageNotFoundComponent} from './shared/page-not-found/page-not-found.component';
import {MainPageComponent} from './customer/main-page/main-page.component';

const routes: Routes = [
  {path: '', redirectTo: '/angular', pathMatch: 'full'},
  {path: 'angular', component: MainPageComponent},
  {path: 'rxjs', component: MainPageComponent},
  {path: 'angular-material', component: MainPageComponent},
  {
    path: 'admin', loadChildren:
      () => import('./admin/admin.module').then(m => m.AdminModule)
  },
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
