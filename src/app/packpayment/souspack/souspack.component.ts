import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-souspack',
  templateUrl: './souspack.component.html',
  styleUrls: ['./souspack.component.css']
})
export class SouspackComponent {
  email=''
constructor(private route:Router,private router:ActivatedRoute){

}
acheter(ch:string){
this.email=sessionStorage.getItem('email')!
if(this.email!=undefined){
  if(ch==='SUPPERIEUR'){
    console.log("supppp")
    localStorage.setItem("pack",'superieur');
    this.route.navigate(['/packsup'])
  }
  else if(ch==='RESTAURER'){
    localStorage.setItem("pack",'restaurer');
    this.route.navigate(['/packsup'])
  }
  else if(ch==='SERVIR'){
    localStorage.setItem("pack",'servir');
    this.route.navigate(['/packsup'])
  }
  else{
    localStorage.setItem("pack",'gold');
    this.route.navigate(['/packsup'])
  }
}
else{
  localStorage.setItem('redirectUrl','packsup');
  localStorage.setItem("pack",ch.toLocaleLowerCase());
this.route.navigate(['login'])
}

}
}
