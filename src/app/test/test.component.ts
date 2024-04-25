import { Component } from '@angular/core';
import { employee } from '../models/employee.model';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent {
email:string=''
emp!:employee
pack!:any
duree!:any
  constructor(private userserv:UserService){
  
this.email=localStorage.getItem('email')!
userserv.getuserbyemail(this.email).subscribe(
  res=>{
    this.emp=res
  }
)
  }
update(){
  this.pack=localStorage.getItem('pack')!
  this.duree=localStorage.getItem('duree')!
  this.emp.pack=this.pack
  this.emp.duree=this.duree
  console.log(this.emp)
  this.userserv.updatemployee(this.emp).subscribe(
    res=>{
      console.log("payment effectuer")
      localStorage.clear()
    }
  )
}
}
