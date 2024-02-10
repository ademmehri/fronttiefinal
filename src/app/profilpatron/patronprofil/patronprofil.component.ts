import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { employee } from 'src/app/models/employee.model';
import { entreprise } from 'src/app/models/entrprise.model';
import { filee } from 'src/app/models/filee.model';
import { EntrepriseService } from 'src/app/services/entreprise.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-patronprofil',
  templateUrl: './patronprofil.component.html',
  styleUrls: ['./patronprofil.component.css']
})
export class PatronprofilComponent {
  id!:bigint;
  emp!:employee
  file!:filee
  url!:string
  cin!:string
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
      console.log(this.cin)
  }
  ngOnInit(): void {
    this.userservice.getfileprofile(this.id).subscribe(
      res=>{
this.file=res
this.url="assets/"+this.file.titlefile
       }
     )



  }
  logout(){
    this.userservice.logout();
    this.route.navigate(["pageprincipale"]);
  }

}
