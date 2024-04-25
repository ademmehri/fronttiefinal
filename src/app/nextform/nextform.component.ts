import { Component, OnInit } from '@angular/core';
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
export class NextformComponent implements OnInit {
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
  showlist=false
d="";
  url="assets/uss.png";
spe=['Barman','Chef de projet événementiel','Responsable communication et événementiel','Réceptionniste','Chef-réceptionniste','Veilleur de nuit','Directeur d’hébergement','Directeur d’hôtel','Adjoint de direction en hôtellerie','Directeur financier d’un hôtel','Directeur de la restauration','Manager spécialisé dans le luxe','Spa manager','Femme de chambre et valet de chambre','Gouvernante','Lingère','Guest Relation Manager','Yield manager','Chef de cuisine','Chef de partie','Commis de cuisine','Chef cuisinier ou chef de production en restauration collective','Chef-gérant en restauration collective','Économe','Manager dans la restauration','Directeur en restauration rapide','Manager d’un restaurant rapide','Gérant','Chef d’équipe d’un restaurant rapide','Pizzaïolo','Pâtissier','Boucher','Boulanger','Poissonnier','Chocolatier-confiseur','Serveur de restaurant','Chef de rang','Maître d’hôtel','Garçon de café','Plongeur','Majordome (Butler)','portier','Crêpier']
  file!:File;
  cv!:File
 empl!:employee
num!:string
result!:employee
  formsignin!:FormGroup;
  input: string = '';
  emptyarray=['hello']
  listfinal=['']
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
    console.log(this.spe)
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
   else if(!this.spe.includes(this.formsignin.controls['sp'].value)){
      this.sp="Sélectionnez votre spécialité"
      this.bsp="border: red 2px solid;"
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
  this.userserv.existmail(this.empl.email).subscribe(
    res=>{
      console.log("resultat")
      console.log(res)
      if(res==false){
        this.userserv.verificationemail(this.empl.email).subscribe(
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
              
                   this.userserv.addfile(this.file,this.empl.email).subscribe(
                    res=>{
                      console.log("res")
                    }
                  )
                  if(this.cv!=undefined){
                    this.userserv.addcv(this.cv,this.empl.email).subscribe(
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
                 title: "Candidat enregistré",
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
  onKeyUp(e:any): void {
    this.showlist=true
    console.log('Key pressed:',e.target.value);
    let userdata=e.target.value
   if(e.target.value==''){
    this.showlist=false
   }
    if(userdata){
      this.emptyarray=this.spe.filter(
        (data)=>{
return data.toLocaleLowerCase().startsWith(userdata.toLocaleLowerCase());
        }
      );
      this.emptyarray=this.emptyarray.map(
  (data)=>{
    return data
  }
)
if(!this.emptyarray.length){
this.input=e.target.value
}
else{
  this.listfinal=this.emptyarray
  this.input=""
}

    }
 console.log(this.emptyarray)
  }
  clickli(e:any){
    this.formsignin.controls['sp'].setValue(e)
  this.showlist=false
  }

}
