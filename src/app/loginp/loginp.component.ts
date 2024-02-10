import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { EntrepriseService } from '../services/entreprise.service';
import { entreprise } from '../models/entrprise.model';
import { authentification } from '../models/authentification.model';

@Component({
  selector: 'app-loginp',
  templateUrl: './loginp.component.html',
  styleUrls: ['./loginp.component.css']
})
export class LoginpComponent implements OnInit {
  result1="";
  result2="";
  id!:number;
ente!:entreprise
  formsignin!:FormGroup;
  resp: any;
  constructor(private fb:FormBuilder,private route:Router,private entservice:EntrepriseService){
    this.formsignin=this.fb.group(
      {
        "email":["",[Validators.required,Validators.email]],
        "mp":["",Validators.required]
      }
    )
  }
  ngOnInit(): void {

   
  }
  onsubmit(){
    console.log(this.formsignin);
    if(this.formsignin.controls['email'].errors?.['required']){
      this.result1="s'il vous plait saisire votre nom!!!!";
      console.log("ok");
    }
    else{
      this.result1="";
    }
    if(this.formsignin.controls['mp'].errors?.['required']){
      this.result2="s'il vous plait saisire votre mot passe!!!!"
    }
    else{
      this.result2="";
    }
    if(this.formsignin.valid){
      let   auth=new authentification();
      auth.mail=this.formsignin.controls['email'].value
      auth.password=this.formsignin.controls['mp'].value
  
 this.entservice.connect(auth).subscribe(
   res=>{
 this.resp=res
   }
 )
 console.log("zzz")
 this.entservice.saveemp(this.resp.token,this.resp.personneid);
 //this.route.navigate(["profilemployee/"+this.resp.personneid]);

    }

  }

}
