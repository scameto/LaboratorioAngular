import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { NgModule } from "@angular/core";
import { ProductListComponent } from "./product-list/product-list.component";
import { CarritoComponent } from "./carrito/carrito.component";
import { CuentaComponent } from "./cuenta/cuenta.component";
import { RegisterComponent} from "./register/register.component";
import { CreateProductComponent } from "./create-product/create-product.component";
import { UpdateProductComponent } from './update-product/update-product.component';
import { InsumoListComponent } from "./insumo-list/insumo-list.component";
import { CreateInsumoComponent } from "./create-insumo/create-insumo.component";

const routes: Routes = [
  { path: '', redirectTo: '/', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'productos/listar', component: ProductListComponent},
  { path: 'carrito', component: CarritoComponent },
  { path: 'cuenta', component: CuentaComponent },
  { path: 'producto/crear', component: CreateProductComponent },
  { path: 'producto/update/:id', component: UpdateProductComponent },
  { path: 'insumos/listar', component: InsumoListComponent },
  { path: 'insumo/crear', component:  CreateInsumoComponent},
  
  { path: 'register', component: RegisterComponent}  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }