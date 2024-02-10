import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SignupComponent } from './signup/signup.component';
import { PagepatronComponent } from './patron/pagepatron/pagepatron.component';
import { Page1Component } from './patron/pagepatron/page1/page1.component';
import { PetitcvComponent } from './petitcv/petitcv.component';
import { PcvComponent } from './petitcv/pcv/pcv.component';
import { PageprincipaleComponent } from './pageprincipale/pageprincipale.component';
import { HeaderComponent } from './pageprincipale/header/header.component';
import { BodyComponent } from './pageprincipale/body/body.component';
import { FooterComponent } from './pageprincipale/footer/footer.component';
import { SignuppComponent } from './signupp/signupp.component';
import { HttpClientModule } from '@angular/common/http';
import { ProfilemployeeComponent } from './profilemployee/profilemployee.component';
import { EmployeeComponent } from './profilemployee/employee/employee.component';
import { ProfilpatronComponent } from './profilpatron/profilpatron.component';
import { PatronprofilComponent } from './profilpatron/patronprofil/patronprofil.component';
import { UpdateComponent } from './update/update.component';
import { LoginpComponent } from './loginp/loginp.component';
import { PackpaymentComponent } from './packpayment/packpayment.component';
import { SouspackComponent } from './packpayment/souspack/souspack.component';
import { UpdatepComponent } from './updatep/updatep.component';
import { NextformComponent } from './nextform/nextform.component';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { PageoffreemployeurComponent } from './pageoffreemployeur/pageoffreemployeur.component';
import { DashbordComponent } from './dashbord/dashbord.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    PagepatronComponent,
    Page1Component,
    PetitcvComponent,
    PcvComponent,
    PageprincipaleComponent,
    HeaderComponent,
    BodyComponent,
    FooterComponent,
    SignuppComponent,
    ProfilemployeeComponent,
    EmployeeComponent,
    ProfilpatronComponent,
    PatronprofilComponent,
    UpdateComponent,
    LoginpComponent,
    PackpaymentComponent,
    SouspackComponent,
    UpdatepComponent,
    NextformComponent,
    PageoffreemployeurComponent,
    DashbordComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    SweetAlert2Module.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
