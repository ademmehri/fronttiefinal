import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { employee } from 'src/app/models/employee.model';
import { filee } from 'src/app/models/filee.model';
import { cordoffre } from 'src/app/models/offre.model';


import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-pcv',
  templateUrl: './pcv.component.html',
  styleUrls: ['./pcv.component.css']
})
export class PcvComponent implements OnInit {
  idempr!:bigint;
  idemp!:bigint;
emp!:employee
cv!:filee
empr!:employee
file!:filee
url='assets/par2.png'
desc!:String
formsignin!:FormGroup;
result1!:string
  constructor(private  router:ActivatedRoute,private userserv:UserService,private fb:FormBuilder,private route:Router){
    this.formsignin=this.fb.group(
      {
        "offre":["",Validators.required],
        
      }
    )
    this.router.params.subscribe(
      (param)=>{
  this.idempr=param['idempr'];
  this.idemp=param['idemp'];
      }
     )
   
  console.log(this.idemp)
  
  this.userserv.getprofilemployee(this.idemp).subscribe(
    res=>{
  this.emp=res
    }
  )
  console.log(this.emp)
  this.userserv.getfileprofile(this.idemp).subscribe(
    res=>{
  this.file=res
  this.url="assets/"+this.file.titlefile
     }
   )

  }
  ngOnInit(): void {
    this.userserv.getcv(this.idemp).subscribe(
      res=>{
    this.cv=res

       }
     )

  
  }
  onsubmit(){
    if(this.formsignin.controls['offre'].errors?.['required']){
      this.result1="s'il vous plait saisire votre offre!!!!";
      
    }
    else{
      this.result1="";
    }
    if(this.formsignin.valid){
      let off:cordoffre=new cordoffre()
      off.idemp=this.idemp
      off.idempr=this.idempr
      off.descriptionoffre=this.formsignin.controls['offre'].value
      this.userserv.addoffre(off).subscribe(
        res=>{
          console.log("okk")
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Offre Ajouter',
            showConfirmButton: false,
            timer: 1500
          })
  
         
        }
        
      )

    }

  }
  annuler(){
    this.route.navigate(["profilemployee"]);
  }

}
