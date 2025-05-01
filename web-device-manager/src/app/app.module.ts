import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './views/main/main.component';
import { ListCategoriesComponent } from './views/category/list-categories/list-categories.component';
import { ListDevicesComponent } from './views/devices/list-devices/list-devices.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    ListCategoriesComponent,
    ListDevicesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
