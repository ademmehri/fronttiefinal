import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-packsup',
  templateUrl: './packsup.component.html',
  styleUrls: ['./packsup.component.css']
})
export class PacksupComponent {
  pac=''
constructor(private route:Router){
  this.pac=localStorage.getItem('pack')!
  localStorage.clear()
}


acheter(ch:string){
  if(ch==='sixmois'){
    localStorage.setItem('duree','six_mois')
  }
  else{
    localStorage.setItem('duree','un_ans')
  }
  this.route.navigate(['/test'])
}
}
