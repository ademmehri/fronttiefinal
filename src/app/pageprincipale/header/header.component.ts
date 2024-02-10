import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  bgcol=""
currentUrl=""
  constructor(private router: Router){
     this.currentUrl = this.router.url;
    console.log(this.currentUrl.substring(1,7))
    if(this.currentUrl.substring(1,7)=="profil"){
this.bgcol="  background-color: #3a6cf4;  color: #fff;"
    }
    

  }
  scroll(){
    this.router.navigate(['/pageprincipale']);
    window.scrollTo(0, document.body.scrollHeight);
  }
  nav(){
    if(this.currentUrl.substring(1,7)!="profil"){
   this.router.navigate(["login"])
          }
  }

}
