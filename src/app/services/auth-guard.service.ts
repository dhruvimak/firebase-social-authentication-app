import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor(private router: Router, private authservice: AuthService) { }
    canActivate() {
        if ( this.authservice.isLoggedIn() ) {
            return true;
        }
        this.router.navigate(['/']);
        return false;
    }
}
