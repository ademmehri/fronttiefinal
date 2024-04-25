import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent implements AfterViewInit {
  @ViewChild('carousel', { static: false }) carouselRef: ElementRef | undefined;

  private startX: any;
  private startScrollLeft: any;
  private timeoutId: any;
  private isAutoPlay = true;
  reponse:any=[]
constructor(private userserv:UserService){
  this.userserv.getnbsp().subscribe(
    res=>{
      this.reponse=res
      console.log(this.reponse)
      console.log(this.reponse.Serveur)
    }
  )
}
  ngAfterViewInit(): void {
    console.log("mizell")
    if (this.carouselRef && this.carouselRef.nativeElement) {
      console.log("d5all");
      const carousel = this.carouselRef.nativeElement;
      const firstCard = carousel.querySelector('.card');
      const firstCardWidth = (firstCard as HTMLElement)?.offsetWidth || 0;
      const totalCards = carousel.querySelectorAll('.card').length;
    
      // Nombre de cartes à afficher en même temps
      const cardsInView = Math.round(carousel.offsetWidth / firstCardWidth);
      console.log("nb"+cardsInView)
      
      let currentPosition = 0;
    
     
      const moveCards = (distance: number) => {
        carousel.scrollLeft += distance;
    
        // Si nous atteignons le début, réinsérez les dernières cartes
        if (carousel.scrollLeft === 0) {
            for (let i = 0; i < cardsInView; i++) {
                const lastCard = carousel.querySelector('.card:last-child');
                carousel.insertAdjacentElement('afterbegin', lastCard!);
            }
            carousel.scrollLeft = firstCardWidth * cardsInView;
        }
        
        // Si nous atteignons la fin, réinsérez les premières cartes
        if (carousel.scrollLeft >= carousel.scrollWidth - carousel.offsetWidth) {
            for (let i = 0; i < cardsInView; i++) {
                //const firstCard = carousel.querySelector('.card:first-child');
               // carousel.appendChild(firstCard!);
            

            }
            carousel.scrollLeft = 0;
        }
    };
      const autoPlay = () => {
        if (window.innerWidth < 800 || !this.isAutoPlay) return;
    
        this.timeoutId = setInterval(() => {
          moveCards(firstCardWidth);
        }, 2500);
    
        console.log(this.timeoutId);
      };
    
      autoPlay();
    }
  }

}
