import { Component } from '@angular/core';
import { employee } from '../models/employee.model';
import { UserService } from '../services/user.service';
import { listemps } from '../models/listemps.model';

@Component({
  selector: 'app-dashbord',
  templateUrl: './dashbord.component.html',
  styleUrls: ['./dashbord.component.css']
})
export class DashbordComponent {
  emps!:employee[]
  emp!:employee[]
  emprcafe!:employee[]
  emprrest!:employee[]
  emprhotel!:employee[]
  constructor(private userservice:UserService){
this.userservice.getemployees().subscribe(
  res=>{
    this.emps=res
    console.log(this.emps)
    this.emp=this.emps.filter((e:employee)=> e.roles[0].role==='ENTR')
    this.emprcafe=this.emps.filter((e:employee)=> e.specialite==='cafe')
    this.emprrest=this.emps.filter((e:employee)=> e.specialite==='Restaurant')
    this.emprhotel=this.emps.filter((e:employee)=> e.specialite==='Hotel')
  }
)
    
  }
}
