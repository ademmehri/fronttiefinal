import { Component } from '@angular/core';
import { entreprise } from '../models/entrprise.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EntrepriseService } from '../services/entreprise.service';
import { ActivatedRoute, Router } from '@angular/router';
import { employeur } from '../models/employeur.model';
import { filee } from '../models/filee.model';
import { employee } from '../models/employee.model';
import { UserService } from '../services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-updatep',
  templateUrl: './updatep.component.html',
  styleUrls: ['./updatep.component.css']
})
export class UpdatepComponent {
  filee!:filee
 mp!:string
  file!:File
  spe=['Barman','Chef de projet événementiel','Responsable communication et événementiel','Réceptionniste','Chef-réceptionniste','Veilleur de nuit','Directeur d’hébergement','Directeur d’hôtel','Adjoint de direction en hôtellerie','Directeur financier d’un hôtel','Directeur de la restauration','Manager spécialisé dans le luxe','Spa manager','Femme de chambre et valet de chambre','Gouvernante','Lingère','Guest Relation Manager','Yield manager','Chef de cuisine','Chef de partie','Commis de cuisine','Chef cuisinier ou chef de production en restauration collective','Chef-gérant en restauration collective','Économe','Manager dans la restauration','Directeur en restauration rapide','Manager d’un restaurant rapide','Gérant','Chef d’équipe d’un restaurant rapide','Pizzaïolo','Pâtissier','Boucher','Boulanger','Poissonnier','Chocolatier-confiseur','Serveur de restaurant','Chef de rang','Maître d’hôtel','Garçon de café','Plongeur','Majordome (Butler)','portier','Crêpier']
  input: string = '';
  emptyarray=['hello']
  listfinal=['']
  result!:employee
  url!:string
id!:bigint
  emp!:employee
  formsignin!:FormGroup;
getcv!:filee
  cv!:File
  afficherTexte!:boolean
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
  bnpm=''
  bemail=''
  bnumero=''
  constructor(private fb:FormBuilder,private userserv:UserService,private route:Router,private router:ActivatedRoute){
    this.formsignin=this.fb.group(
      {
        
        "num":["",Validators.required],
        "sp":["",[Validators.required]],
        "exp":["",[Validators.required]],
        "gov":["",[Validators.required]],
        "city":["",[Validators.required]],
        "nom":["",[Validators.required]],
        "date":["",[Validators.required]],
        "email":["",[Validators.required]],
        "rad":["",[Validators.required]],
        "rad2":["",[Validators.required]],
      }
    )
   
  }
  ngOnInit(): void {
    this.router.params.subscribe(
      (param)=>{
        this.id=param['id']
      }
    
    )
    this.userserv.getprofilemployee(this.id).subscribe(
        res=>{
this.emp=res
this.formsignin.controls['num'].setValue(this.emp.num)
this.formsignin.controls['nom'].setValue(this.emp.nom)
this.formsignin.controls['email'].setValue(this.emp.email)
this.formsignin.controls['date'].setValue(this.emp.date)
this.formsignin.controls['rad'].setValue(this.emp.sexe)
this.formsignin.controls['rad2'].setValue(this.emp.etat)
this.formsignin.controls['sp'].setValue(this.emp.specialite)
this.formsignin.controls['exp'].setValue(this.emp.exp)
this.formsignin.controls['gov'].setValue(this.emp.gouvernerat)
this.formsignin.controls['city'].setValue(this.emp.city)
console.log(this.emp)
        }
      )
this.userserv.getcv(this.id).subscribe(
  res=>{
    this.getcv=res
  }
)
      this.userserv.getfileprofile(this.id).subscribe(
        res=>{
  this.filee=res
  this.url="assets/"+this.filee.titlefile
  console.log(this.filee)
         }
       )
 
   
  }
  onsubmit(){
    console.log(this.formsignin);
    
   
if(this.formsignin.valid){



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

    onselectcv(e: any){
      if(e.target.files){
        var reader=new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        this.cv=e.target.files[0];
        console.log(this.file.name);
      
      }
    
    }

    onKeyUp(e:any): void {
      console.log('Key pressed:',e.target.value);
      let userdata=e.target.value
     
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
    }
  
    selctimg(){
      Swal.fire({
        title: 'Modifier votre image',
        input: 'file',
      
      }).then(
        file=>{
          if(this.filee){
            this.userserv.updatecv(file.value,this.filee.idfile).subscribe(
              res=>{
                this.userserv.getfileprofile(this.id).subscribe(
                  res=>{
            this.filee=res
            this.url="assets/"+this.filee.titlefile
                   }
                 )
              }
             )
          }
          else{
            this.userserv.addfile(file.value,this.emp.email).subscribe(
              res=>{
                this.userserv.getfileprofile(this.id).subscribe(
                  res=>{
            this.filee=res
            this.url="assets/"+this.filee.titlefile
                   }
                 )
              }
             )
          }
     
        }
      )
  }
  modifier(){
    if(this.formsignin.controls['city'].errors?.['required']){
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
    if(this.formsignin.controls['email'].errors?.['required']){
      this.bemail="border: red 2px solid;"
      this.sp="champ obligatoire"
    }
    else{
      this.bemail="border: green 2px solid;"
      this.sp=""
    }
    if(this.formsignin.controls['nom'].errors?.['required']){
      this.bnpm="border: red 2px solid;"
      this.sp="champ obligatoire"
    }
    else{
      this.bnpm="border: green 2px solid;"
      this.sp=""
    }
    if(this.formsignin.controls['num'].errors?.['required']){
      this.bnumero="border: red 2px solid;"
      this.sp="champ obligatoire"
    }
    else{
      this.bnumero="border: green 2px solid;"
      this.sp=""
    }
    console.log(this.formsignin)
    if(this.formsignin.valid){
      console.log("d5amll")
   this.emp.nom=this.formsignin.controls['nom'].value
   console.log("d5amll2")
      this.emp.city= this.formsignin.controls['city'].value
     
      this.emp.sexe=this.formsignin.controls['rad'].value;
   
      this.emp.exp=this.formsignin.controls['exp'].value;
      console.log("d5amll2")
      this.emp.specialite=this.formsignin.controls['sp'].value;
      this.emp.gouvernerat=this.formsignin.controls['gov'].value;
      this.emp.date=this.formsignin.controls['date'].value;
      this.emp.etat=this.formsignin.controls['rad2'].value;
  console.log(this.emp)

               this.userserv.updatemployee(this.emp).subscribe(
                 res=>{
                  if(this.cv!=undefined){
                    this.userserv.updatecv(this.cv,this.getcv.idfile).subscribe(
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
                 title: "Candidat Modifier",
                 showConfirmButton: false,
                 timer: 1500
               });
               this.route.navigate(["profilemployee/"+this.id]);
               }
            
      
    
  }
  annuler(){
    this.route.navigate(["profilemployee/"+this.id]);
  }


}
