import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
   {
  path: "",
  redirectTo: '' ,
  pathMatch: "full",
},
{
  path: "",
  loadChildren: () =>
    import("../app/components/auth/auth.module").then((m) => m.AuthModule),
},
{
  path: "super",
  loadChildren: () =>
    import("../app/components/super-admin/super-admin.module").then((m) => m.SuperAdminModule),
},
{
  path: "customer",
  loadChildren: () =>
    import("../app/components/admin/admin.module").then((m) => m.AdminModule),
},
{
  path: "employee",
  loadChildren: () =>
    import("../app/components/customer/customer.module").then((m) => m.CustomerModule),
},
{
  path: "developments",
  loadChildren: () =>
    import("../app/components/development/development.module").then((m) => m.DevelopmentModule),
},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
