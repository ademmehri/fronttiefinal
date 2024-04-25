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
  isDropdownOpen: boolean = false;
previousListLength: number = 0;
listoff:any=[]
nombreOffres: number = this.listoff.length

  id!:bigint;
emp!:employee
file!:filee
url='assets/par2.png'
cin!:string

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
console.log(this.emp)
        }
      )


  }
  ngOnInit(): void {
    localStorage.clear()
    this.userservice.getfileprofile(this.id).subscribe(
      res=>{
this.file=res
this.url="assets/"+this.file.titlefile
       }
     )
     this.userservice.getoffre(this.id).subscribe(
      res=>{
        this.listoff=res
        const newLength = this.listoff.length;
        const diff = newLength - this.previousListLength;
        this.nombreOffres = diff;
        this.previousListLength = newLength;
        console.log("Différence de nombre d'offres : " + diff);
        console.log("Offres actuelles : ");
        console.log(this.listoff);

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
toggleDropdown() {
  this.isDropdownOpen = !this.isDropdownOpen;
  if (!this.isDropdownOpen) {
  
    this.nombreOffres = 0;
  }
}
navigate(offre:listoffre){

  localStorage.setItem('desc',offre.descoffre)
  this.route.navigate(["pageoffreemployeur/"+offre.id]);
}

}
