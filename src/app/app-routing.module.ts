import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { NgModule } from "@angular/core";
import { ProductListComponent } from "./product-list/product-list.component";
import { CarritoComponent } from "./carrito/carrito.component";
import { CuentaComponent } from "./cuenta/cuenta.component";

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'listar', component: ProductListComponent},
  { path: 'carrito', component: CarritoComponent },
  { path: 'cuenta', component: CuentaComponent },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }