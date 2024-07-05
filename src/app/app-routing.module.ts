import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { NgModule, inject } from "@angular/core";
import { ProductListComponent } from "./product-list/product-list.component";
import { CuentaComponent } from "./cuenta/cuenta.component";
import { RegisterComponent} from "./register/register.component";
import { CreateProductComponent } from "./create-product/create-product.component";
import { UpdateProductComponent } from './update-product/update-product.component';
import { InsumoListComponent } from "./insumo-list/insumo-list.component";
import { CreateInsumoComponent } from "./create-insumo/create-insumo.component";
import { ForgotPasswordComponent } from "./forgot-password/forgot-password.component";
import { ChangePasswordComponent } from './change-password/change-password.component'; 
import { AuthGuard } from './guards/auth.guard';
import { UsuarioListComponent } from "./usuario-list/usuario-list.component";
import { ResetPasswordComponent } from "./reset-password/reset-password.component";
import { PedidosListComponent } from "./pedidos-list/pedidos-list.component";


const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'usuarios/listar', component: UsuarioListComponent },
  { path: 'productos/listar', component: ProductListComponent},
  { path: 'cuenta', component: CuentaComponent, canActivate: [() => inject(AuthGuard).canActivate()] },
  { path: 'producto/crear', component: CreateProductComponent },
  { path: 'producto/update/:id', component: UpdateProductComponent },
  { path: 'insumos/listar', component: InsumoListComponent },
  { path: 'insumo/crear', component:  CreateInsumoComponent},
  { path: 'register', component: RegisterComponent},  
  { path: 'forgot-password', component: ForgotPasswordComponent},
  { path: 'reset-password/:id', component: ResetPasswordComponent },
  { path: 'change-password', component: ChangePasswordComponent },  
  { path: 'pedidos', component: PedidosListComponent },  
  { path: '**', redirectTo: 'productos/listar' },



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }