import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { employee } from 'src/app/models/employee.model';
import { listoffre } from 'src/app/models/empoffre.model';
import { filee } from 'src/app/models/filee.model';
import { Offre } from 'src/app/models/listoffre.model';

import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  id!:bigint;
emp!:employee
file!:filee
url!:string
cin!:string
listoff!:listoffre[]
empr!:employee;
$element:any
cv!:filee
bcolor=""

  constructor(private router:ActivatedRoute,private userservice:UserService,private route:Router){
    this.router.params.subscribe(
      (param)=>{
        this.id=param['id']
      }
    
    )
    this.userservice.getprofilemployee(this.id).subscribe(
        res=>{
this.emp=res
this.cin=this.emp.cin
        }
      )


  }
  ngOnInit(): void {
    this.userservice.getfileprofile(this.id).subscribe(
      res=>{
this.file=res
this.url="assets/"+this.file.titlefile
       }
     )
     this.userservice.getoffre(this.id).subscribe(
      res=>{
        this.listoff=res
        console.log(this.listoff)
        if(this.listoff.length!=0){
  this.bcolor="color: red;"
        }
        else{
          this.bcolor="color: #3a6cf4;"
        }

      }

     )
     this.userservice.getcv(this.id).subscribe(
      res=>{
    this.cv=res

       }
     )

   
  }
  logout(){
    
   this.userservice.logout();
    this.route.navigate(["pageprincipale"]);
  }
 // this.route.navigate(["pageprincipale"]);
  consult(id:number){
    this.route.navigate(["pageoffreemployeur/"+id]);
  }
scroll(){
  window.scrollTo(0, document.body.scrollHeight);
}

}
