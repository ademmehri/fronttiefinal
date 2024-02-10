import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { entreprise } from '../models/entrprise.model';
import { EntrepriseService } from '../services/entreprise.service';
import { employeur } from '../models/employeur.model';
import { ActivatedRoute, Router } from '@angular/router';
import { employee } from '../models/employee.model';
import { UserService } from '../services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signupp',
  templateUrl: './signupp.component.html',
  styleUrls: ['./signupp.component.css']
})
export class SignuppComponent {
 nom=""
 bnom=""
 numero=""
 bnumero=""
 mp=""
 bmp=""
 email=""
 bemail=""
 bgov=""
 gov=""
 bsp=""
 sp=""
  s=""
  timg=""
  file!:File
  cin!:string
  num!:string
  result!:employee
  url=""
  formsignin!:FormGroup;
  constructor(private fb:FormBuilder,private userserv:UserService,private route:Router,private router:ActivatedRoute){
    this.formsignin=this.fb.group(
      {
        "nom":["",Validators.required],
        "numero":["",Validators.required],
         "email":["",[Validators.required,Validators.email]],
        "mp":["",Validators.required],
        "gov":["",Validators.required],
        "sp":["",Validators.required],
    
        
      }
    )
  }
  ngOnInit(): void {
   
  }
  onsubmit(){
    console.log(this.formsignin);
    if(this.verifierNom(this.formsignin.controls['nom'].value)){
      this.bnom="border: green 2px solid;"
      this.nom=""
    }
    else{
      this.bnom="border: red 2px solid;"
      this.nom="champ invalide"
    }


    if(this.formsignin.controls['sp'].errors?.['required']){
      this.bsp="border: red 2px solid;"
      this.sp="champ invalide"
     
    }
    else{
      this.bsp="border: green 2px solid;"
      this.sp=""
    }
    if(this.formsignin.controls['gov'].errors?.['required']){
      this.bgov="border: red 2px solid;"
      this.gov="champ invalide"
     
    }
    else{
      this.bgov="border: green 2px solid;"
      this.gov=""
    }
    if(this.verifierNumero(this.formsignin.controls['numero'].value)){
      this.bnumero="border: green 2px solid;"
      this.numero=""
    }
    else{
      this.bnumero="border: red 2px solid;"
      this.numero="champ invalide"
    }
  
    if(this.formsignin.controls['email'].errors?.['email'] || this.formsignin.controls['email'].errors?.['required']){
      this.bemail="border: red 2px solid;"
      this.email="champ invalide"
    }
    else{
      this.bemail="border: green 2px solid;"
      this.email=""
    }
    if(this.verifierMotDePasse(this.formsignin.controls['mp'].value)){
      this.bmp="border: green 2px solid;"
  this.mp=""
   }
   else{
    this.bmp="border: red 2px solid;"
    this.mp="doit contrnir chiffre,lettre minsicule ,majuscule au moins 8 caractere"
   }
    if(this.url==""){
      this.timg="Choisie une image";
    }
    else{
      this.timg=""
    }
if(this.formsignin.valid && this.url!="" && this.verifierNom(this.formsignin.controls['nom'].value) && this.verifierNumero(this.formsignin.controls['numero'].value) && this.verifierMotDePasse(this.formsignin.controls['mp'].value) ){
  console.log("ok1");
  let emp:employee=new employee();
  emp.nom=this.formsignin.controls['nom'].value.replace(/ /g,'').toLowerCase();
emp.role="entreprise";
  emp.mail=this.formsignin.controls['email'].value
  emp.password=this.formsignin.controls['mp'].value;
  emp.gouvernerat=this.formsignin.controls['gov'].value;
  emp.num=this.formsignin.controls['numero'].value
  emp.specialite=this.formsignin.controls['sp'].value
  console.log(emp);
  this.userserv.addemployee(emp).subscribe(
  (ch)=>{
 this.result=ch
 this.userserv.addfile(this.file,this.result.mail).subscribe(
  res=>{
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Employeur enrigistrer',
      showConfirmButton: false,
      timer: 1500
    })
   /* this.userserv.sendemail(this.result.mail).subscribe(
      res=>{
        console.log(res)
      }
    )*/
   // this.route.navigate(["packpayment/"+this.result.id]);
  }
 )

   }
  )

 



}


  }
  onselectfile(e: any){
    if(e.target.files){
      var reader=new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      this.file=e.target.files[0]
      reader.onload=(event:any)=>{
        this.url=event.target.result;
      }
    }
  
  }
      onselect(e:any){
      console.log(this.s);
      this.s=e.target.value;
      console.log(this.s);
    }
    onselecte(e:any){
      console.log(this.s);
      this.sp=e.target.value;
      console.log(this.s);
    }
  
  
    verifierNom(nom: string): boolean {
      // Vérifier la longueur minimale
      if (nom.length < 4) {
          return false;
      }
  
      // Vérifier s'il n'y a pas de chiffres dans le nom
      if (/\d/.test(nom)) {
          return false;
      }
  
      // Si toutes les conditions sont remplies, le nom est valide
      return true;
  }
  
  verifierNumero(champ: string): boolean {
    // Expression régulière pour vérifier si le champ contient exactement 8 chiffres
    const regex = /^\d{8}$/;
  
    // Teste si le champ correspond à l'expression régulière
    return regex.test(champ);
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
