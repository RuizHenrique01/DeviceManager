import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './views/main/main.component';
import { ListCategoriesComponent } from './views/category/list-categories/list-categories.component';
import { ListDevicesComponent } from './views/devices/list-devices/list-devices.component';
import { CreateCategoriesComponent } from './views/category/create-categories/create-categories.component';
import { CreateDevicesComponent } from './views/devices/create-devices/create-devices.component';
import { PageNotFoundComponent } from './views/page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path: "",
    redirectTo: 'device-manager/category',
    pathMatch: 'full'
  },
  {
    path: 'device-manager',
    component: MainComponent,
    children: [
      {
        path: 'category', // child route path
        component: ListCategoriesComponent, // child route component that the router renders
      },
      {
        path: 'new-category', // child route path
        component: CreateCategoriesComponent, // child route component that the router renders
      },
      {
        path: 'device', // child route path
        component: ListDevicesComponent, // child route component that the router renders
      },
      {
        path: 'new-device', // child route path
        component: CreateDevicesComponent, // child route component that the router renders
      },
    ]
  },
  {
      path: '**',
      component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
