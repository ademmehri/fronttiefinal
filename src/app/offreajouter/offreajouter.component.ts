import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { ActivatedRoute } from '@angular/router';
import { filee } from '../models/filee.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-offreajouter',
  templateUrl: './offreajouter.component.html',
  styleUrls: ['./offreajouter.component.css']
})
export class OffreajouterComponent {
  offres!:any
  id!:bigint
constructor(private userserv:UserService,private router:ActivatedRoute){
  this.router.params.subscribe(
    (param)=>{
      this.id=param['id']
    }
  )
  this.userserv.getoffrecrrerparemployeur(this.id).subscribe(
    res=>{
      this.offres=res
      console.log(this.offres)
      this.offres.forEach((off:any) =>
      {
        this.userserv
        .getfileprofile(off.employee.id)
        .subscribe((img: filee) => {
         
          if(img==null){
            off.imageStr = 'assets/profil.png'
          }
          else{
            off.imageStr = 'assets/'+img.titlefile
          }
         
        })
        });
    }
  )

}
annuler(id:bigint){
  Swal.fire({
    title: "Est ce que vous voulez supprimer cette offre?",
    showDenyButton: true,
    showCancelButton: true,
    confirmButtonText: "Oui",
    denyButtonText: `Non`
  }).then((result) => {
    /* Read more about isConfirmed, isDenied below */
    if (result.isConfirmed) {
      this.userserv.deleteoffre(id).subscribe(
        res=>{
          Swal.fire("offre Sypprimeé", "", "success");
          window.location.reload();
        }
      )
     
    } else if (result.isDenied) {
      Swal.fire("Changement annuler", "", "info");
    }
  });
}
}
