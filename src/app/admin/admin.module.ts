import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { DashboardPageComponent } from './dashboard/dashboard-page/dashboard-page.component';
import { AddPageComponent } from './add-page/add-page.component';
import { EditPageComponent } from './edit-page/edit-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { DashboardContentComponent } from './dashboard/dashboard-content/dashboard-content.component';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { DashboardAsideComponent } from './dashboard/dashboard-aside/dashboard-aside.component';
import { MatSelectModule } from '@angular/material/select';
import { ToolbarComponent } from './shared/toolbar/toolbar.component';
import { MatButtonModule } from '@angular/material/button';
import { QuillModule } from 'ngx-quill';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CategoryPageComponent } from './category-page/category-page.component';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';


@NgModule({
  declarations: [
    AdminComponent,
    DashboardPageComponent,
    AddPageComponent,
    EditPageComponent,
    LoginPageComponent,
    DashboardContentComponent,
    DashboardAsideComponent,
    ToolbarComponent,
    CategoryPageComponent
  ],
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
    MatSortModule,
    MatSelectModule,
    MatButtonModule,
    QuillModule.forRoot(),
    MatTooltipModule,
    MatIconModule,
    MatExpansionModule
  ]
})
export class AdminModule {
}
