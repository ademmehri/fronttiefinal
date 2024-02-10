
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';

import { Router } from '@angular/router';
import { authentification } from '../models/authentification.model';
import { responseauth } from '../models/responseauth';
import Swal from 'sweetalert2';
import { employee } from '../models/employee.model';
import { __values } from 'tslib';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  result1="";
  result2="";
  id!:number;
ch!:any
  resp!:any
  response!:any
  formsignin!:FormGroup;
  rsult!:any
  emp!:employee
  bgcol=""
  mp!:string
  bgcol2=""
  constructor(private fb:FormBuilder,private route:Router,private userserv:UserService){
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
    if(this.formsignin.controls['email'].errors?.['email'] || this.formsignin.controls['email'].errors?.['required']){
this.bgcol="border: red 2px solid;"
      console.log("ok");
    }
    else{
      this.bgcol="border: green 2px solid;"
    
    }
    this.mp=this.formsignin.controls['mp'].value
    if(this.mp.length<6){
      this.bgcol2="border: red 2px solid;"
    }
    else{ 
         this.bgcol2="border: green 2px solid;"
    }
    if(this.formsignin.valid){
     let   auth=new authentification();
     auth.mail=this.formsignin.controls['email'].value
     auth.password=this.formsignin.controls['mp'].value
  console.log(auth)
     this.userserv.connect(auth).subscribe(
      res=>{
        this.response=res
        console.log(this.response.token)
        if(this.response.token!=undefined){
          this.userserv.saveemp(this.response.token,this.response.personneid,this.response.role)
          this.userserv.userconnecter()
        }
        else{
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Personne non existe',
         
          })
        }
  
      }
     ) 
    
     
    
     
 


  //Swal.fire({
  //  icon: 'error',
   // title: 'Oops...',
   // text: 'personne non existe',
    
 // })


    }
  
  }
  motpasseoubliee(){
    Swal.fire({
      title: 'donner votre email',
      input: 'email'
    }).then(
      email=>{
        console.log(email.value)
        this.userserv.motpasseoubliee(email.value).subscribe(
          res=>{
            console.log(res)
            if(res=="Message envoyee"){
              Swal.fire({
                icon: 'success',
                text: 'Mot passe envoyeé',
             
              })
            }
            else{
              Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Personne non existe',
             
              })
            }
          }
        )
      }
    )
  }

  }

