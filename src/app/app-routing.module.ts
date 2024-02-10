import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { Page1Component } from './patron/pagepatron/page1/page1.component';
import { PagepatronComponent } from './patron/pagepatron/pagepatron.component';
import { PetitcvComponent } from './petitcv/petitcv.component';
import { PcvComponent } from './petitcv/pcv/pcv.component';
import { PageprincipaleComponent } from './pageprincipale/pageprincipale.component';
import { HeaderComponent } from './pageprincipale/header/header.component';
import { BodyComponent } from './pageprincipale/body/body.component';
import { FooterComponent } from './pageprincipale/footer/footer.component';
import { SignuppComponent } from './signupp/signupp.component';
import { ProfilemployeeComponent } from './profilemployee/profilemployee.component';
import { EmployeeComponent } from './profilemployee/employee/employee.component';
import { PatronprofilComponent } from './profilpatron/patronprofil/patronprofil.component';
import { ProfilpatronComponent } from './profilpatron/profilpatron.component';
import { UpdateComponent } from './update/update.component';
import { LoginpComponent } from './loginp/loginp.component';
import { PackpaymentComponent } from './packpayment/packpayment.component';
import { SouspackComponent } from './packpayment/souspack/souspack.component';
import { UpdatepComponent } from './updatep/updatep.component';
import { NextformComponent } from './nextform/nextform.component';
import { PageoffreemployeurComponent } from './pageoffreemployeur/pageoffreemployeur.component';
import { DashbordComponent } from './dashbord/dashbord.component';


const routes: Routes = [
  {path:'login',component:LoginComponent},
  {path:'loginpatron',component:LoginpComponent},
  {path:'signup',component:SignupComponent},
  {path:'patron',component:Page1Component},
  {path:'pagepatron/:id',component:PagepatronComponent},
  {path:'petitcv/:idempr/:idemp',component:PetitcvComponent},
  {path:'pcv',component:PcvComponent},
  {path:'pageprincipale',component:PageprincipaleComponent},
  {path:'header',component:HeaderComponent},
  {path:'body',component:BodyComponent},
  {path:'pageprincipale/footer',component:FooterComponent},
  {path:'footer',component:FooterComponent},
  {path:'signuppatron',component:SignuppComponent},
  {path:'profilemployee/:id',component:ProfilemployeeComponent},
  {path:'employee',component:EmployeeComponent},
  {path:'profilpatron/:id',component:ProfilpatronComponent},
  {path:'patronprofil',component:PatronprofilComponent},
  {path:'updatepatron/:id',component:UpdateComponent},
  {path:'packpayment/:id',component:PackpaymentComponent},
  {path:'dachbord',component:DashbordComponent},
  {path:'souspackpayment',component:SouspackComponent},
  {path:'updateemp/:cin',component:UpdatepComponent},
  {path:'nextform',component:NextformComponent},
  {path:'pageoffreemployeur/:id',component:PageoffreemployeurComponent},

  
   

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
