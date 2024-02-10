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
  id!:bigint
s=""
r=""
c=""
emps!:patronemp[]
ch!:string
resultat!:string
formsignin!:FormGroup;
 cordrech!:getlistemp
 empr!:employee
 region=""
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
    this.userserv.getprofilemployee(this.id).subscribe(
      res=>{
this.empr=res
console.log(this.empr.gouvernerat)
this.userserv.getlistemployeegouv(this.empr.gouvernerat).subscribe(
  res=>{
    this.emps=res
  }
)

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


}
