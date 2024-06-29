import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { UserService } from './services/user.service';
import { ProductService } from './services/product.service';
import { InsumoService } from './services/insumo.service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { RegisterComponent } from './register/register.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ProductListComponent } from './product-list/product-list.component';
import { AuthInterceptor } from './services/auth-interceptor.service';
import { ProductCardComponent } from './product-card/product-card.component';
import { CarritoComponent } from './carrito/carrito.component';
import { CuentaComponent } from './cuenta/cuenta.component';
import { NavbarComponent } from './navbar/navbar.component';

import { CreateProductComponent } from './create-product/create-product.component';
import { UpdateProductComponent } from './update-product/update-product.component';
import { InsumoListComponent } from './insumo-list/insumo-list.component';
import { CreateInsumoComponent } from './create-insumo/create-insumo.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { PedidosComponent } from './pedidos/pedidos.component';
import { AuthGuard } from './guards/auth.guard';
import { UsuarioListComponent } from './usuario-list/usuario-list.component';  // Asegúrate de importar el guardián de autenticación
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ProductListComponent,
    ProductCardComponent,
    CarritoComponent,
    CuentaComponent,
    NavbarComponent,
    CreateProductComponent,
    UpdateProductComponent,
    InsumoListComponent,
    CreateInsumoComponent,
    PedidosComponent,
    UsuarioListComponent,
    
    
 
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    RouterModule,
    ReactiveFormsModule,
    ForgotPasswordComponent,
    ChangePasswordComponent,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right', // Puedes cambiar esto a la posición que desees
      preventDuplicates: true,
      toastClass: 'ngx-toastr custom-toast',
    }),
  ],
  providers: [
    UserService,
    ProductService,
    AuthGuard,  
    InsumoService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true 
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
