import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { responseauth } from '../models/responseauth';
import { employee } from '../models/employee.model';
import { filee } from '../models/filee.model';
import { authentification } from '../models/authentification.model';
import { userconnect } from '../models/user.model';
import { Router } from '@angular/router';
import { cordoffre} from '../models/offre.model';
import { Offre } from '../models/listoffre.model';
import { listoffre } from '../models/empoffre.model';
import { patronemp } from '../models/patronemp.model';
import { getlistemp } from '../models/getlistemp.model';
import { listemps } from '../models/listemps.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpclt:HttpClient,private route:Router) {

   }
   existmail(email:string):Observable<Boolean>{
    return this.httpclt.get<Boolean>("http://localhost:8080/auth/exists/"+email);
   }
   verificationemail(email:string):Observable<any>{
    const formData: FormData = new FormData();
    formData.append('email', email);
    return this.httpclt.post<any>("http://localhost:8080/auth/verifieremail",formData);
   }
   adduser(us:employee):Observable<any>{
    return this.httpclt.post<any>("http://localhost:8080/auth/addUser",us);
   }
   addemployee(emp:employee):Observable<employee>{
    console.log(emp)
    return this.httpclt.post<employee>("http://localhost:8080/auth/save",emp);
       }
       addfile(file:File,mail:string):Observable<String>{
        const formData: FormData = new FormData();
    formData.append('file', file);
        return this.httpclt.post("http://localhost:8080/auth/savefichier/"+mail,formData,{responseType: 'text'});
           }
           addcv(file:File,mail:string):Observable<String>{
            const formData: FormData = new FormData();
        formData.append('file', file);
            return this.httpclt.post("http://localhost:8080/auth/addcv/"+mail,formData,{responseType: 'text'});
               }

   getemployee(mail:string):Observable<employee>{
    return this.httpclt.get<employee>("http://localhost:8080/auth/getemployeebyemail/"+mail)
   }
   getemployeefile(mail:string):Observable<filee>{
      return this.httpclt.get<filee>("http://localhost:8080/file/getfile/"+mail)
     }
   updatemployee(emp:employee):Observable<employee>{
    console.log("service")
    return this.httpclt.post<employee>("http://localhost:8080/auth/update",emp);
   }

   connect(auth:authentification):Observable<any>{
    return this.httpclt.post<any>("http://localhost:8080/auth/login",auth);
   }
   connectemp(auth:authentification):Observable<any>{
    return this.httpclt.post<any>("http://localhost:8080/auth/loginemp",auth);
   }
   saveemp(acessToken:string,iduser:number,role:string){
   let user:userconnect=new userconnect()

  user.id=iduser
   user.role=role
   console.log(user)
    sessionStorage.setItem("jwt",acessToken);
    sessionStorage.setItem("userc",JSON.stringify(user));
   }
   logout(){
  
    sessionStorage.clear();
   
    this.route.navigate(["login"]);
   }

    updatefile(file:File,id:bigint):Observable<filee>{
      const formData: FormData = new FormData();
  formData.append('file', file);
      return this.httpclt.post<filee>("http://localhost:8080/file/updatefile/"+id,formData);
         }
         updatecv(file:File,id:bigint):Observable<filee>{
          const formData: FormData = new FormData();
      formData.append('file', file);
          return this.httpclt.post<filee>("http://localhost:8080/file/updatecv/"+id,formData);
             }
         getprofilemployee(id:bigint):Observable<employee>{
          return this.httpclt.get<employee>("http://localhost:8080/auth/getemployeebyid/"+id);
         }
         getfileprofile(id:bigint):Observable<filee>{
          return this.httpclt.get<filee>("http://localhost:8080/file/getfileemploye/"+id);
         }
         getcv(id:bigint):Observable<filee>{
          return this.httpclt.get<filee>("http://localhost:8080/file/getcv/"+id);
         }
         userconnecter(){
          let user:userconnect=JSON.parse(sessionStorage.getItem("userc")!);
          if(user.role=="user"){
            this.route.navigate(["profilemployee/"+user.id]);

          }
          else{
            this.route.navigate(["profilpatron/"+user.id]);
          }

         }
         addoffre(off:cordoffre):Observable<Offre>{
    
          return this.httpclt.post<Offre>("http://localhost:8080/offre/addoffre",off)        }
          getoffre(idemp:bigint):Observable<listoffre[]>{
            return this.httpclt.get<listoffre[]>("http://localhost:8080/offre/getoffre/"+idemp);
          }
          getlistemployee(cordlistemp:getlistemp):Observable<patronemp[]>{
            return this.httpclt.post<patronemp[]>("http://localhost:8080/auth/recherche",cordlistemp);
          }
          getlistemployeegouv(gouv:string):Observable<patronemp[]>{
            return this.httpclt.get<patronemp[]>("http://localhost:8080/auth/recherchegouver/"+gouv);
          }
          getemployeecin(cin:string):Observable<employee>{
            return this.httpclt.get<employee>("http://localhost:8080/auth/getemployeebycin/"+cin);
          }
          confirmemail(token:string,mail:string):Observable<String>{
            return this.httpclt.get("http://localhost:8080/auth/confirmtoken/"+token+"/"+mail,{responseType: 'text'});
          }
          sendemail(mail:string):Observable<String>{
            return this.httpclt.get("http://localhost:8080/auth/sendemail/"+mail,{responseType: 'text'});
          }
          sendemailoffre(mail:string,qui:string):Observable<String>{
            return this.httpclt.get("http://localhost:8080/auth/sendemailoffre/"+mail+"/"+qui,{responseType: 'text'});
          }
          motpasseoubliee(mail:string):Observable<String>{
            return this.httpclt.get("http://localhost:8080/auth/motpasseoubliee/"+mail,{responseType: 'text'});
          }
          getallemployee():Observable<listemps[]>{
            return this.httpclt.get<listemps[]>("http://localhost:8080/auth/getallemployee");
          }

   
}
