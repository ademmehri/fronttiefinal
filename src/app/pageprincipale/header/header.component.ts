import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { employee } from 'src/app/models/employee.model';
import { filee } from 'src/app/models/filee.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  bgcol=""
currentUrl=""
showMenu = false;
showtarif=false
role!:string
file!:filee
url='assets/par2.png'
user_connect!:employee
  constructor(private router: Router,private userserv:UserService){
    const userEmail = sessionStorage.getItem('email');
    this.userserv.getuserbyemail(userEmail!).subscribe(
      res=>{
        this.user_connect=res
        this.role=res.roles[0].role
        this.userserv.getfileprofile(res.id).subscribe(
          res=>{
    this.file=res
    this.url="assets/"+this.file.titlefile
    console.log(this.url)
           }
         )
      }

    )
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
  dropdownVisible: boolean = false;
  
  toggleDropdown() {
    this.dropdownVisible = !this.dropdownVisible;
  }
  toggleMenu() {
    this.showMenu =!this.showMenu;
  }
  Menuferme(){
    this.showMenu = false;
  }
  showt(){
    this.showtarif=!this.showtarif
  }
  scrollToContact() {
    const contactElement = document.getElementById('contact');
    if (contactElement) {
      contactElement.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
