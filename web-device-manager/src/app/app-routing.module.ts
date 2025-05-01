import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './views/main/main.component';
import { ListCategoriesComponent } from './views/category/list-categories/list-categories.component';
import { ListDevicesComponent } from './views/devices/list-devices/list-devices.component';

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
        path: 'device', // child route path
        component: ListDevicesComponent, // child route component that the router renders
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
