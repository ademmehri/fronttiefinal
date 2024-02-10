import { Component } from '@angular/core';
import { employee } from '../models/employee.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { employeur } from '../models/employeur.model';
import { UserService } from '../services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-nextform',
  templateUrl: './nextform.component.html',
  styleUrls: ['./nextform.component.css']
})
export class NextformComponent {
  response!:any
  token=""
bdate=""
date=""
exp=""
bexp=""
bsexe=""
sexe=""
etat=""
betat=""
breg=""
reg=""
bsp=""
sp=""
gov=""
bgov=""
  timg=""
d="";
  url="";
  
  file!:File;
  cv!:File
 empl!:employee
num!:string
result!:employee
  formsignin!:FormGroup;
  constructor(private fb:FormBuilder,private route:Router,private userserv:UserService,private router:ActivatedRoute){
 
    this.formsignin=this.fb.group(
      {
        "date":["",Validators.required],
        "exp":["",[Validators.required]],
        "rad1":["",Validators.required],
        "rad2":["",Validators.required],
        "region":["",[Validators.required]],
        "sp":["",Validators.required],
        "gov":["",Validators.required],
        
      }
    )
  }
  ngOnInit(): void {
    this.empl=JSON.parse(localStorage.getItem("emp")!)
  }

  onsubmit(){
    console.log(this.formsignin);
    if(this.formsignin.controls['region'].errors?.['required']){
      this.breg="border: red 2px solid;"
      this.reg="champ obligatoire"
    }
    else{
      this.breg="border: green 2px solid;"
      this.reg=""
    
    }
    if(this.formsignin.controls['exp'].errors?.['required']){
      this.bexp="border: red 2px solid;"
      this.exp="champ obligatoire"
    }
    else{
      this.bexp="border: green 2px solid;"
      this.exp=""
    }
    if(this.formsignin.controls['date'].errors?.['required']){
      this.bdate="border: red 2px solid;"
      this.date="champ obligatoire"
    }
    else{
      this.bdate="border: green 2px solid;"
      this.date=""
    }
    if(this.url==""){
      this.timg="Choisie une image"
    }
    else{
      this.timg="";
    }
    if(this.formsignin.controls['gov'].errors?.['required']){
      this.bgov="border: red 2px solid;"
      this.gov="champ obligatoire"
    }
    else{
      this.bgov="border: green 2px solid;"
      this.gov=""
    }
    if(this.formsignin.controls['sp'].errors?.['required']){
      this.bsp="border: red 2px solid;"
      this.sp="champ obligatoire"
    }
    else{
      this.bsp="border: green 2px solid;"
      this.sp=""
    }
    if(this.formsignin.controls['rad1'].errors?.['required']){
      this.bsexe="border: red 2px solid;"
      this.sexe="champ obligatoire"
    }
    else{
      this.bsexe="border: green 2px solid;"
      this.sexe=""
    }
    if(this.formsignin.controls['rad2'].errors?.['required']){
      this.betat="border: red 2px solid;"
      this.etat="champ obligatoire"
    }
    else{
      this.betat="border: green 2px solid;"
      this.etat=""
    }
    if(this.formsignin.valid){
      console.log("okkkk")
  
      this.empl.city= this.formsignin.controls['region'].value
      this.empl.sexe=this.formsignin.controls['rad1'].value;
      this.empl.exp=this.formsignin.controls['exp'].value;
      this.empl.specialite=this.formsignin.controls['sp'].value;
      this.empl.gouvernerat=this.formsignin.controls['gov'].value;
      this.empl.date=this.formsignin.controls['date'].value;
      this.empl.etat=this.formsignin.controls['rad2'].value;
  console.log(this.empl)
  this.userserv.existmail(this.empl.mail).subscribe(
    res=>{
      if(res==false){
        this.userserv.verificationemail(this.empl.mail).subscribe(
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
               this.userserv.adduser(this.empl).subscribe(
                 res=>{
              
                   this.userserv.addfile(this.file,this.result.mail).subscribe(
                    res=>{
                      console.log("res")
                    }
                  )
                  console.log("cv"+this.cv)
                  if(this.cv!=undefined){
                    this.userserv.addcv(this.cv,this.result.mail).subscribe(
                      res=>{
                        console.log("res")
                      }
                    )
                  }
                 }
                 
               )
               Swal.fire({
                 position: "top-end",
                 icon: "success",
                 title: "Candidat inscrit",
                 showConfirmButton: false,
                 timer: 1500
               });
               this.route.navigate(["login"]);
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
      else{
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Persone existe',
       
        })
      }
    }
   )
 }
  }
  onselectfile(e: any){
    if(e.target.files){
      var reader=new FileReader();
      
      reader.readAsDataURL(e.target.files[0]);
      this.file=e.target.files[0];
      console.log(this.file.name);
      reader.onload=(event:any)=>{
        this.url=event.target.result;
      }
    }
  
  }
  onselectcv(e: any){
    if(e.target.files){
      var reader=new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      this.cv=e.target.files[0];
      console.log(this.file.name);
    
    }
  
  }

  onselecte(e:any){
    this.d=e.target.value;
  }
  onselectee(e:any){
    this.sp=e.target.value;
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
