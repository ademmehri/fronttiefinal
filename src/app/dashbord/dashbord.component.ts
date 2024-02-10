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
  emps!:listemps[]
  constructor(private userservice:UserService){
    this.userservice.getallemployee().subscribe(
      res=>{
        this.emps=res
      }
    )
    
  }
}
