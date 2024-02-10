import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { employee } from '../models/employee.model';
import { filee } from '../models/filee.model';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {
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
  id!:bigint
  constructor(private fb:FormBuilder,private userserv:UserService,private route:Router,private router:ActivatedRoute){
    this.formsignin=this.fb.group(
      {
        
        "numero":["",Validators.required],
         "email":["",[Validators.required,Validators.email]],
         "mp":[""]
        
      }
    )
    this.router.params.subscribe(
      (param)=>{
        this.id=param['id']
      }
    )
  }
  ngOnInit(): void {
    this.userserv.getprofilemployee(this.id).subscribe(
      res=>{
this.empl=res
this.formsignin.controls['email'].setValue(this.empl.mail)
this.s=this.empl.gouvernerat
this.formsignin.controls['numero'].setValue(JSON.parse(this.empl.num))
this.userserv.getemployeefile(this.empl.mail).subscribe(
  (f)=>{
this.filee=f
console.log(this.filee.titlefile)
this.url="assets/"+this.filee.titlefile
  }
)
      }
    )
 
   
  }
  onsubmit(){
    console.log(this.formsignin);
  
 
    this.num=JSON.stringify(this.formsignin.controls['numero'].value)
    console.log(this.num.length)
    if(this.num.length!=8){
      this.result5="numero incorrect!!!!";

    }
    else{
      this.result5="";
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
  emp.id=this.id
emp.role="entreprise";
  emp.mail=this.formsignin.controls['email'].value.replace(/ /g,'').toLowerCase()

  emp.gouvernerat=this.empl.gouvernerat
  emp.num=this.formsignin.controls['numero'].value;
  emp.specialite=this.empl.specialite
  emp.id=this.empl.id
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
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Update Effectue',
        showConfirmButton: false,
        timer: 1500
      })
      this.route.navigate(["profilpatron/"+this.nemp.id]);
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
  

  


}
