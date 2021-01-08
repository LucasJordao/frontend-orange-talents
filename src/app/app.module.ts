import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { BancosComponent } from './bancos/bancos.component';
import { ClientesComponent } from './clientes/clientes.component';
import { FooterComponent } from './footer/footer.component';
import { FormComponent } from './form/form.component';
import { TextMaskModule } from 'angular2-text-mask';

import { ReactiveFormsModule} from '@angular/forms';
import { BancosService } from './bancos.service';

import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    BancosComponent,
    ClientesComponent,
    FooterComponent,
    FormComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    TextMaskModule,
    HttpClientModule
  ],
  providers: [
    BancosService,
    HttpClientModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
