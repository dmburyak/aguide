import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AdminRoutingModule} from './admin-routing.module';
import {AdminComponent} from './admin.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {AddPageComponent} from './add-page/add-page.component';
import {EditPageComponent} from './edit-page/edit-page.component';
import {LoginPageComponent} from './login-page/login-page.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatTableModule} from '@angular/material/table';
import {DashboardContentComponent} from './dashboard-content/dashboard-content.component';
import {MatSortModule} from '@angular/material/sort';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import { DashboardAsideComponent } from './dashboard-aside/dashboard-aside.component';


@NgModule({
  declarations: [AdminComponent, DashboardComponent, AddPageComponent, EditPageComponent, LoginPageComponent, DashboardContentComponent, DashboardAsideComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    FormsModule,
    MatToolbarModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSortModule
  ]
})
export class AdminModule {
}
