import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { employee } from '../models/employee.model';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-updatepassword',
  templateUrl: './updatepassword.component.html',
  styleUrls: ['./updatepassword.component.css']
})
export class UpdatepasswordComponent {
  result1="";
  result2="";
  formsignin!:FormGroup;
  bgcol=""
  mp!:string
  bgcol2=""
  response!:any
  token=""
  email=""
  constructor(private fb:FormBuilder,private route:Router,private userserv:UserService,private router:ActivatedRoute){
    this.router.params.subscribe(
      (param)=>{
        this.email=param['email']
      }
    )
    this.formsignin=this.fb.group(
      {
        "password":["",Validators.required],
        "cpassword":["",Validators.required],
      }
    )
  }
  ngOnInit(): void {

   
  }
  onsubmit(){
    console.log(this.formsignin);
    if( this.verifierMotDePasse(this.formsignin.controls['password'].value)){
      console.log("mottpase valide")
     this.result2=""
     this.bgcol2="border: green 2px solid;"
          }
          else{
            console.log("mottpase invalide")
            this.bgcol2="border: red 2px solid;"
            this.result2="doit contenir des lettre majuscule,miniscule et des chiffres"
          }
          if( this.verifierMotDePasse(this.formsignin.controls['cpassword'].value) && this.formsignin.controls['cpassword'].value===this.formsignin.controls['password'].value ){
            console.log("mottpase valide")
           this.result1=""
           this.bgcol="border: green 2px solid;"
                }
                else{
                  console.log("mottpase invalide")
                  this.bgcol="border: red 2px solid;"
                  this.result1="doit contenir des lettre majuscule,miniscule et des chiffres"
                }
          if(this.formsignin.valid &&  this.verifierMotDePasse(this.formsignin.controls['password'].value) && this.verifierMotDePasse(this.formsignin.controls['cpassword'].value) && this.formsignin.controls['cpassword'].value===this.formsignin.controls['password'].value){
         let use:employee=new employee()
         use.email=this.email
         use.password=this.formsignin.controls['password'].value
         this.userserv.updatepassword(use).subscribe(
          (res)=>{
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Update Effectue",
              showConfirmButton: false,
              timer: 1500
            });
            this.route.navigate(["login"]);
          }
         )
           
           }
  
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
}
