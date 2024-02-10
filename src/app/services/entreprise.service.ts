import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { entreprise } from '../models/entrprise.model';
import { Observable } from 'rxjs';
import { employeur } from '../models/employeur.model';
import { filee } from '../models/filee.model';
import { authentification } from '../models/authentification.model';
@Injectable({
  providedIn: 'root'
})
export class EntrepriseService {

  constructor(private httpclt:HttpClient) {

   }
   addentreprise(patron:employeur):Observable<String>{
    console.log("mawjoud"+patron)
    console.log(patron)
    return this.httpclt.post<String>("http://localhost:8080/employeur/ajout",patron);
    
       }
       addfile(file:File,mail:string):Observable<String>{
        const formData: FormData = new FormData();
    formData.append('file', file);
        return this.httpclt.post<String>("http://localhost:8080/employeur/savefichier/"+mail,formData);
           }
      
       login(email:string,mp:string):Observable<entreprise>{
        return this.httpclt.get<entreprise>("http://localhost:3000/entreprise?email="+email+"&mp="+mp)
       }
       getemployeur(mail:string):Observable<employeur>{
        return this.httpclt.get<employeur>("http://localhost:8080/employeur/getemployeur/"+mail)
       }
       getmp(mp:string):Observable<entreprise>{
        return this.httpclt.get<entreprise>("http://localhost:3000/entreprise?"+mp)
       }
       getempfile():Observable<filee>{
        return this.httpclt.get<filee>("http://localhost:8080/file/getfileemployeur/damdoum@gmail.com")
       }
       updatemployeur(patron:employeur):Observable<employeur>{
        console.log("service")
        return this.httpclt.post<employeur>("http://localhost:8080/employeur/update",patron);
       }
       updatefile(file:File,mail:string):Observable<filee>{
        const formData: FormData = new FormData();
    formData.append('file', file);
        return this.httpclt.post<filee>("http://localhost:8080/file/updatefileemployeur/"+mail,formData);
           }
           connect(auth:authentification):Observable<any>{
            return this.httpclt.post<any>("http://localhost:8080/auth/login",auth);
           }
           saveemp(acessToken:string,iduser:number){
            sessionStorage.setItem("jwt",acessToken);
            sessionStorage.setItem("iduser",JSON.stringify(iduser));
           }
           logout(){
            sessionStorage.clear();
           }
      
}
