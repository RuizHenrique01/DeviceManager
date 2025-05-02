import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './views/main/main.component';
import { ListCategoriesComponent } from './views/category/list-categories/list-categories.component';
import { ListDevicesComponent } from './views/devices/list-devices/list-devices.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreateCategoriesComponent } from './views/category/create-categories/create-categories.component';
import { CreateDevicesComponent } from './views/devices/create-devices/create-devices.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    ListCategoriesComponent,
    ListDevicesComponent,
    CreateCategoriesComponent,
    CreateDevicesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
