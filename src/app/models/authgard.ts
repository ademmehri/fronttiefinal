import { Injectable } from '@angular/core';
import { CanActivate, Router, NavigationStart } from '@angular/router';

import { filter } from 'rxjs/operators';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    constructor(private authService: UserService, private router: Router) {}
  
    canActivate(): boolean {
      if (!this.authService.isLoggedIn()) {
        this.router.navigate(['/login']);
        return false;
      }
      return true;
    }
  }

