import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { NgModule } from "@angular/core";
import { ProductListComponent } from "./product-list/product-list.component";
import { RegisterComponent} from "./register/register.component";

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'listar', component: ProductListComponent}
  { path: 'register', component: RegisterComponent}  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }