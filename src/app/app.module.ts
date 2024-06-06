import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { UserService } from './services/user.service';
import { ProductService } from './services/product.service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ProductListComponent } from './product-list/product-list.component';
import { AuthInterceptor } from './services/auth-interceptor.service';
import { ProductCardComponent } from './product-card/product-card.component';
import { CarritoComponent } from './carrito/carrito.component';
import { CuentaComponent } from './cuenta/cuenta.component';
import { CuentaService } from './services/cuenta.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ProductListComponent,
    ProductCardComponent,
    CarritoComponent,
    CuentaComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    RouterModule
  ],
  providers: [UserService,
              ProductService,
              CuentaService,
              {provide: HTTP_INTERCEPTORS,
                useClass: AuthInterceptor,
                multi: true 
              }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
