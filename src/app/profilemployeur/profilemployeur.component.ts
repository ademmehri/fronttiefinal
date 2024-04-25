import { Component } from '@angular/core';
import { employee } from '../models/employee.model';
import { filee } from '../models/filee.model';
import { listoffre } from '../models/empoffre.model';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-profilemployeur',
  templateUrl: './profilemployeur.component.html',
  styleUrls: ['./profilemployeur.component.css']
})
export class ProfilemployeurComponent {
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
console.log(this.emp)
        }
      )


  }
  ngOnInit(): void {
    this.userservice.getfileprofile(this.id).subscribe(
      res=>{
this.file=res
this.url="assets/"+this.file.titlefile
console.log(this.url)
       }
     )
     this.userservice.getoffre(this.id).subscribe(
      res=>{
        this.listoff=res
        console.log("offre")
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
