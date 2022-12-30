import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSidenavModule } from '@angular/material/sidenav';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { AddItemComponent } from './add-item/add-item.component';
import { CartComponent } from './cart/cart.component';
import { NgxWebstorageModule } from 'ngx-webstorage';
import { CheckoutComponent } from './checkout/checkout.component';

import { ProductComponent } from './product/product.component';
import { LayoutModule } from '@angular/cdk/layout';
// import { JwPaginationComponent } from 'jw-angular-pagination';
import { NgxPaginationModule } from 'ngx-pagination';
@NgModule({
  declarations: [
    RegisterComponent, 
    LoginComponent,
    ProfileComponent, 
    HomeComponent, 
    AppComponent, 
    AddItemComponent, 
    CartComponent, 
    ProductComponent, 
    CheckoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    MatSidenavModule,
    LayoutModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    NgxWebstorageModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
})
export class AppModule { }
