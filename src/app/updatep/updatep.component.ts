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
  result1="";
  result2="";
  result3="";
  result4="";
  result5=""
  result6=""
  s=""
  filee!:filee
 mp!:string
  file!:File
  cin!:string
  num!:string
  result!:employee
  url!:string
  empl!:employee
  numo!:number
  formsignin!:FormGroup;
  nemp!:employee
  cv!:File
  constructor(private fb:FormBuilder,private userserv:UserService,private route:Router,private router:ActivatedRoute){
    this.formsignin=this.fb.group(
      {
        
        "numero":["",Validators.required],
         "email":["",[Validators.required,Validators.email]],
         "mp":[""],
        "region":["",[Validators.required]],
        
      }
    )
    this.router.params.subscribe(
      (param)=>{
        this.cin=param['cin']
      }
    )
  }
  ngOnInit(): void {
    this.userserv.getemployeecin(this.cin).subscribe(
      res=>{
this.empl=res
this.formsignin.controls['region'].setValue(this.empl.city)
this.formsignin.controls['email'].setValue(this.empl.mail)
this.s=this.empl.gouvernerat
this.formsignin.controls['numero'].setValue(JSON.parse(this.empl.num))
this.userserv.getfileprofile(this.empl.id).subscribe(
  res=>{
this.filee=res
this.url="assets/"+this.filee.titlefile
   }
 )

      }
    )
 
   
  }
  onsubmit(){
    console.log(this.formsignin);
    if(this.formsignin.controls['region'].errors?.['required']){
      this.result2="region vide!!!!";
     
    }
    else{
      this.result2="";
    }
    this.num=JSON.stringify(this.formsignin.controls['numero'].value)
    console.log(this.num.length)
    if(this.num.length!=8){
      this.result5="numero incorrect!!!!";

    }
    else{
      this.result5="";
    }
    if(this.s==""){
      this.result6="gouvernerat vide!!!!";

    }
    else{
      this.result6="";
    }
    if(this.formsignin.controls['email'].errors?.['email'] || this.formsignin.controls['email'].errors?.['required']){
      this.result3="email incorrect!!!!"
    }
    else{
      this.result3="";
    }
if(this.formsignin.valid){
  console.log("ok1");

  let emp:employee=new employee();
  emp.nom=this.empl.nom;
emp.role="user";
  emp.mail=this.formsignin.controls['email'].value.replace(/ /g,'').toLowerCase()
  
  emp.gouvernerat=this.s
  emp.num=this.formsignin.controls['numero'].value;
  emp.city=this.formsignin.controls['region'].value.replace(/ /g,'').toLowerCase()
  emp.sexe=this.empl.sexe
  emp.date=this.empl.date
  emp.id=this.empl.id
  emp.exp=this.empl.gouvernerat
  emp.specialite=this.empl.specialite
  emp.cin=this.empl.cin
  console.log(this.formsignin.controls['mp'].value)
  if(this.formsignin.controls['mp'].value==""){
    emp.password=this.empl.cp
    emp.cp=this.empl.cp
  }
  else{
    emp.password=this.formsignin.controls['mp'].value
    emp.cp=this.formsignin.controls['mp'].value
  }
  console.log(emp)
  this.userserv.updatemployee(emp).subscribe(
    (empe)=>{
      this.nemp=empe
      
      this.userserv.updatefile(this.file,this.nemp.id).subscribe(
        res=>{
          console.log(res)
        }
      )
      console.log("zzz"+this.cv)
    if(this.cv!=undefined){
      this.userserv.updatecv(this.cv,this.nemp.id).subscribe(
        res=>{
          console.log(res)
        }
      )
    }

      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Update Effectue',
        showConfirmButton: false,
        timer: 1500
      })
      this.route.navigate(["profilemployee/"+this.nemp.id]);
    }
  )

 // this.route.navigate(["nextform/"+this.result.cin]);
 



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
    onselectcv(e: any){
      if(e.target.files){
        var reader=new FileReader();
        
        reader.readAsDataURL(e.target.files[0]);
        this.cv=e.target.files[0];
        console.log(this.file.name);
      
      }
    
    }

  




}
