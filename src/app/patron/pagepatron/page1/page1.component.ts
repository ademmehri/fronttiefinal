import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { employee } from 'src/app/models/employee.model';
import { getlistemp } from 'src/app/models/getlistemp.model';
import { patronemp } from 'src/app/models/patronemp.model';

import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-page1',
  templateUrl: './page1.component.html',
  styleUrls: ['./page1.component.css']
})
export class Page1Component implements OnInit {
  dateexpiration!:Date
  id!:bigint
s=""
r=""
c=""
dur!:any
droitpayement!:boolean

emps!:patronemp[]
ch!:string
resultat!:string
formsignin!:FormGroup;
 cordrech!:getlistemp
 empr!:employee
 region=""
 test!:any
 employees!:employee[]
 etat=''
 hotelsup=["Directeur d’hôtel", "Directeur d'hebergement", 
 "Adjoint de directeur en hotellerie","Directeur de la restauration",
 "Directuer financier d'un hotel","Guest relation manager",
 "Manager dans la restauration","Spa manager","Yield manager"]
 hotelrest=["Chef de cuisine","Chef de partie",
 "Commis de cuisine","Chef-gérant en restauration collective", 
 "Cuisinier","Pizzaiolo",
 "Barman","Patissier",
 "Boucher","Boulanger","Poissonnier","Chocalatier-confisseur","Charcutier-traiteur","Econome","Gérant"]
 hotelserv=["Serveur de restaurant ","Chef de rang", 
 "Maitre d'hotel","Garçon de café",
 "Plongeur","Serveuse",
 "Majordome(Butler)","Bagagiste","Chasseur","liftier","Groom","Portier"]
 sup=["Directeur de la restauration",
 "Directeur financier d'un restaurant", 
 "Gérant","Econome",
 "Manager de restauration"]
 rest=["Chef de cuisine","Chef de partie",
 "Commis de cuisine", 
 "Cuisinier","Pizzaiolo",
 "Barman","Patissier",
 "Boucher","Boulanger","Poissonnier","Chocalatier-confisseur","Charcutier-traiteur","Econome","Gérant"]
 serv=["Serveur","Chef de rang",
 "Plongeur","Serveuse",
 "Portier"]
 hotelgold=["Directeur d’hôtel", "Directeur d'hebergement", 
 "Adjoint de directeur en hotellerie","Directeur de la restauration",
 "Directuer financier d'un hotel","Guest relation manager",
 "Manager dans la restauration","Spa manager","Yield manager","Chef de cuisine","Chef de partie",
 "Commis de cuisine","Chef-gérant en restauration collective", 
 "Cuisinier","Pizzaiolo",
 "Barman","Patissier",
 "Boucher","Boulanger","Poissonnier","Chocalatier-confisseur","Charcutier-traiteur","Econome","Gérant","Serveur de restaurant ","Chef de rang", 
 "Maitre d'hotel","Garçon de café",
 "Plongeur","Serveuse",
 "Majordome(Butler)","Bagagiste","Chasseur","liftier","Groom","Portier"]
 gold=["Directeur de la restauration",
 "Directeur financier d'un restaurant", 
 "Gérant","Econome",
 "Manager de restauration","Chef de cuisine","Chef de partie",
 "Commis de cuisine", 
 "Cuisinier","Pizzaiolo",
 "Barman","Patissier",
 "Boucher","Boulanger","Poissonnier","Chocalatier-confisseur","Charcutier-traiteur","Econome","Gérant","Serveur","Chef de rang",
 "Plongeur","Serveuse",
 "Portier"]
 pageSize: string|number|undefined;
p: string|number|undefined;

constructor(private userserv:UserService,private router:ActivatedRoute,private fb:FormBuilder,private route:Router){


  this.formsignin=this.fb.group(
    {
   
    }
  )
  this.router.params.subscribe(
    (param)=>{
      this.id=param['id']
    }
  )

}


  ngOnInit(): void {
    
    this.dateexpiration=new Date()
    this.userserv.getprofilemployee(this.id).subscribe(
      res=>{
this.empr=res
this.payement();
console.log(this.droitpayement)
console.log(this.empr.pack)
this.test=this.empr.pack
console.log("test")
console.log(this.test)

if(this.test=="superieur" && this.empr.specialite=="Hotel"){
  this.userserv.getemployeeSuperieur().subscribe(
    res=>{
  this.employees=res

  console.log(this.employees)
  })
}
else if(this.test=="restaurer" && this.empr.specialite=="Hotel"){
  this.userserv.getemployeeRestaurer().subscribe(
    res=>{
    this.employees=res
      console.log(this.employees)
      console.log("test")
    }
  )
}
else if(this.test=="servir"  && this.empr.specialite=="Hotel"){
  this.userserv.getemployeeServir().subscribe(
    res=>{
      this.employees=res
      console.log(this.employees)
      console.log("test")
    }
  )
}
else if(this.test=="gold"  && this.empr.specialite=="Hotel"){
  this.userserv.getemployeeRestaurer().subscribe(
    res=>{
     this.employees=res
      console.log(this.employees)
      console.log("test")
    }
  )
}
else if(this.test=="gold"  && this.empr.specialite!="Hotel"){
  this.userserv.getemployeeGold_res().subscribe(
    res=>{
    this.employees=res
      console.log(this.employees)
      console.log("test")
    }
  )
}
else if(this.test=="superieur"  && this.empr.specialite!="Hotel"){
  this.userserv.getemployeeSuperieur_res().subscribe(
    res=>{
     this.employees=res
      console.log(this.employees)
      console.log("test")
    }
  )
}
else if(this.test=="restaurer"  && this.empr.specialite!="Hotel"){
  this.userserv.getemployeeServir_res().subscribe(
    res=>{
      this.employees=res
      console.log("test")
      console.log(this.employees)
    }
  )
}
else if(this.test=="servir"  && this.empr.specialite!="Hotel"){
  this.userserv.getemployeeServir_res().subscribe(
    res=>{
      this.employees=res
      console.log("test")
      console.log(this.employees)
    }
  )
}
else if(this.test=="gold"  && this.empr.specialite!="Hotel"){
  this.userserv.getemployeeGold_res().subscribe(
    res=>{
      this.employees=res
      console.log("test")
      console.log(this.employees)

    }
  )
}
      }
    )

  }
  onsubmit(){
    if(this.s=="" ||this.c=="" || this.r==""){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Choix incoorect',
      })
    }
    console.log(this.formsignin)
 if(this.s!="" && this.c!="" && this.r!=""){
  let cord:getlistemp=new getlistemp();
  console.log(this.s)
  console.log(this.r)
  console.log(this.c)
 
  cord.city=this.region
  cord.gouvernerat=this.r
  cord.sexe=this.c
  cord.spe=this.s
  console.log(cord)
  this.userserv.getlistemployee(cord).subscribe(
    res=>{
      this.emps=res
      console.log(this.emps)
    }
  )

 }
  }
  onselect(e:any){
    this.s=e.target.value;
  }
  onselectetat(e:any){
    this.etat=e.target.value;
  }
  onselectreg(e:any){
   
    this.r=e.target.value;
   
  }
  onselectregion(e:any){
   
    this.region=e.target.value;
   
  }
  onselectsexe(e:any){
    this.c=e.target.value;

  }
  consulter(idemp:number){
    console.log(idemp)
    this.route.navigate(["petitcv/"+this.id+"/"+idemp]);
  }
  rechercher(){
    console.log(this.etat,this.r,this.s,this.c)
    this.userserv.getemployeebyEtatAndGouverneratAndSpecialiteAndSexe(this.etat,this.r,this.s,this.c).subscribe(
      res=>{
        this.employees=res
      }
    )
  }

  payement(){
    //test de payment 7jours
    this.dur=this.empr.duree
    if(this.dur=='set_jours'){
      console.log("ccc")
      const dateActuelle: Date = new Date();
      const dateFinPack: Date = new Date(this.empr.d_inscrit);
      const d_p:number= 1;
      dateFinPack.setDate(dateFinPack.getDate()+7);
      console.log("datefin")
      console.log(dateFinPack)
      console.log(dateActuelle)
      if(dateActuelle >= dateFinPack){
       if(this.empr.specialite=='Hotel'){
        this.route.navigate(["/souspackpayment"])
        Swal.fire("Votre abonmment a été expiré !! Achetez de nouveau");
       }
        else{
          this.route.navigate(["/spackrest"])
          Swal.fire("Votre abonmment a été expiré !! Achetez de nouveau");
        }
      }
    }
    //test de payment 6mois
    this.dur=this.empr.duree
    if(this.dur=='six_mois'){
      console.log("ccc")
      const dateActuelle: Date = new Date();
      const dateFinPack: Date = new Date(this.empr.d_inscrit);
      
      dateFinPack.setMonth(dateFinPack.getMonth() + 6);
      console.log(dateFinPack)
     
      if(dateActuelle <= dateFinPack){
        if(this.empr.specialite=='Hotel'){
          this.route.navigate(["/souspackpayment"])
          Swal.fire("Votre abonmment a été expiré !! Achetez de nouveau");
         }
          else{
            this.route.navigate(["/spackrest"])
            Swal.fire("SweetAlert2 is working!");
          }
      }
    }
    //test de payment 1ans
    this.dur=this.empr.duree
    if(this.dur=='un_ans'){
      console.log("ccc")
      const dateActuelle: Date = new Date();
      const dateFinPack: Date = new Date(this.empr.d_inscrit);
      
      dateFinPack.setFullYear(dateFinPack.getFullYear() + 1);
      console.log(dateFinPack)
      if(dateActuelle <= dateFinPack){
        if(this.empr.specialite=='Hotel'){
          this.route.navigate(["/souspackpayment"])
          Swal.fire("Votre abonmment a été expiré !! Achetez de nouveau");
         }
          else{
            this.route.navigate(["/spackrest"])
            Swal.fire("SweetAlert2 is working!");
          }
      }
    }
  }

totalItems!:number
 
}
