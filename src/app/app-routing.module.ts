import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { NgModule, inject } from "@angular/core";
import { ProductListComponent } from "./product-list/product-list.component";
import { CarritoComponent } from "./carrito/carrito.component";
import { CuentaComponent } from "./cuenta/cuenta.component";
import { RegisterComponent} from "./register/register.component";
import { CreateProductComponent } from "./create-product/create-product.component";
import { UpdateProductComponent } from './update-product/update-product.component';
import { InsumoListComponent } from "./insumo-list/insumo-list.component";
import { CreateInsumoComponent } from "./create-insumo/create-insumo.component";
import { ForgotPasswordComponent } from "./forgot-password/forgot-password.component";
import { ChangePasswordComponent } from './change-password/change-password.component'; 
import { AuthGuard } from './guards/auth.guard';
import { PedidosComponent } from "./pedidos/pedidos.component";



const routes: Routes = [
  { path: '', redirectTo: 'productos/listar', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'productos/listar', component: ProductListComponent},
  { path: 'cuenta', component: CuentaComponent, canActivate: [() => inject(AuthGuard).canActivate()] },
  { path: 'carrito', component: CarritoComponent, canActivate: [() => inject(AuthGuard).canActivate()] },
  { path: 'producto/crear', component: CreateProductComponent },
  { path: 'producto/update/:id', component: UpdateProductComponent },
  { path: 'insumos/listar', component: InsumoListComponent },
  { path: 'insumo/crear', component:  CreateInsumoComponent},
  { path: 'register', component: RegisterComponent},  
  { path: 'forgot-password', component: ForgotPasswordComponent},
  { path: 'change-password', component: ChangePasswordComponent },  
  { path: 'pedidos', component: PedidosComponent, canActivate: [AuthGuard] }, 
  { path: 'mis-pedidos', component: PedidosComponent, data: { modo: 'mis-pedidos' } },
  { path: '**', redirectTo: 'productos/listar' },



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }