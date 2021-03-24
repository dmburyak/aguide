import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MainLayoutComponent} from './shared/main-layout/main-layout.component';
import {AngularPageComponent} from './angular-page/angular-page.component';
import {RxjsPageComponent} from './rxjs-page/rxjs-page.component';
import {MaterialPageComponent} from './material-page/material-page.component';
import { PageNotFoundComponent } from './shared/page-not-found/page-not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    MainLayoutComponent,
    AngularPageComponent,
    RxjsPageComponent,
    MaterialPageComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
