
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';

import { Router } from '@angular/router';
import { authentification } from '../models/authentification.model';
import { responseauth } from '../models/responseauth';
import Swal from 'sweetalert2';
import { employee } from '../models/employee.model';
import { __values } from 'tslib';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  result1="";
  result2="";
  formsignin!:FormGroup;
  bgcol=""
  mp!:string
  bgcol2=""
  response!:any
  token=""
  use!:employee
  role!:string
  dur!:any
  droitpayement!:boolean
  constructor(private fb:FormBuilder,private route:Router,private userserv:UserService,private http: HttpClient){
    this.formsignin=this.fb.group(
      {
      
        "email":["",[Validators.required,Validators.email]],
        "password":["",Validators.required]
      }
    )
  }
  ngOnInit(): void {

   
  }
  onsubmit(){
    console.log(this.formsignin);
    if(this.formsignin.controls['email'].errors?.['email'] || this.formsignin.controls['email'].errors?.['required']){
this.bgcol="border: red 2px solid;"
      console.log("ok");
      this.result1="Email invalide"
    
    }
    else{
      this.bgcol="border: green 2px solid;"
      this.result1=""
    
    }
    if( this.verifierMotDePasse(this.formsignin.controls['password'].value)){
    
     this.result2=""
     this.bgcol2="border: green 2px solid;"
          }
          else{
            console.log("mottpase invalide")
            this.bgcol2="border: red 2px solid;"
            this.result2="doit contenir des lettre majuscule,miniscule et des chiffres"
          }
          if(this.formsignin.valid &&  this.verifierMotDePasse(this.formsignin.controls['password'].value)){
            let   us=new employee();
            us.email=this.formsignin.controls['email'].value
            us.password=this.formsignin.controls['password'].value
            console.log("uss")
            console.log(us)
            const credentials = { email:us.email, password:us.password };
console.log("fff")
            this.userserv.login(credentials).subscribe(
             (response) => {
              console.log("fff2")
               const headers = response.headers;
               const authToken = headers.get('Authorization');
               this.userserv.getroleemployee(us.email).subscribe(
                res=>{
              this.role=res[0].role
this.userserv.save( authToken,us.email,this.role)
this.userserv.getuserbyemail(us.email).subscribe(
  res=>{
    this.use=res
    if(this.role=='ENTR'){
      if(localStorage.getItem('redirectUrl')!=undefined){
        const url=localStorage.getItem('redirectUrl')
      
        this.route.navigate([url]);
       }
       else{
        
      this.route.navigate(['/pagepatron/'+this.use.id])
       }
    }
    else{
          this.route.navigate(['/profilemployee/'+this.use.id])
    }
  }
)

                }
               )
             
              },
              (error) => {
                Swal.fire({
                  icon: 'error',
                  title: 'Oops...',
                 text: 'Persone non existe',
               
                })
              }
              )
  
  }}
  motpasseoubliee(){
    Swal.fire({
      title: 'donner votre email',
      input: 'email'
    }).then(
      email=>{
        console.log(email.value)
        this.userserv.verificationemail(email.value).subscribe(
          res=>{
            this.response=res
            this.token= this.response.token
            console.log(this.token)
            Swal.fire("Code Veification envoi par email");
            Swal.fire({
              title: 'Code de verification envoi par email',
              input: 'number'
            }).then(
              number=>{
                console.log(number.value)
                    console.log(res)
                    if(this.token==number.value){
                      this.route.navigate(["updatepass/"+email.value]);
                    }
                    else{
                      Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'COde incorecte',
                     
                      })
                    }
                  
              
              }
            )
          }
        )
      }
    )
  }
 verifierMotDePasse(motDePasse: string): boolean {
    // Vérifier la longueur minimale
    if (motDePasse.length < 8) {
      return false;
    }
  
    // Vérifier la présence d'au moins un chiffre
    const aUnChiffre = /\d/.test(motDePasse);
  
    // Vérifier la présence d'au moins une lettre majuscule
    const aUneMajuscule = /[A-Z]/.test(motDePasse);
  
    // Vérifier la présence d'au moins une lettre minuscule
    const aUneMinuscule = /[a-z]/.test(motDePasse);
  
    // Retourner true si toutes les conditions sont remplies, sinon false
    return aUnChiffre && aUneMajuscule && aUneMinuscule;
  }
  showMenu = false;

toggleMenu() {
  this.showMenu = true;
  console.log("ok")
}
Menuferme(){
  this.showMenu = false;
}

  }

