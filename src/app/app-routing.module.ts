import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AngularPageComponent} from './angular-page/angular-page.component';
import {RxjsPageComponent} from './rxjs-page/rxjs-page.component';
import {MaterialPageComponent} from './material-page/material-page.component';
import {PageNotFoundComponent} from './shared/page-not-found/page-not-found.component';

const routes: Routes = [
  {path: '', redirectTo: '/angular', pathMatch: 'full'},
  {path: 'angular', component: AngularPageComponent},
  {path: 'rxjs', component: RxjsPageComponent},
  {path: 'angular-material', component: MaterialPageComponent},
  {path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)},
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
