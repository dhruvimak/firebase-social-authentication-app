import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '../../../node_modules/@angular/router';
import { ProfileService } from '../services/profile.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private authservice: AuthService,
    private router: Router,
    private profile: ProfileService) { }

  ngOnInit() {
  }

  loginWithFacebook() {
    this.authservice
      .signInWithFacebook()
      .then(res => {
        if (res.additionalUserInfo.isNewUser) this.profile.createUser(res.user);
        else this.router.navigate(["dashboard"]);
      })
      .catch(err => console.log(err));
  }

  loginWithGoogle() {
    this.authservice
      .signInWithGoogle()
      .then(res => {
       if (res.additionalUserInfo.isNewUser) this.profile.createUser(res.user);
        else {
          this.authservice.authenticateUser();
          this.router.navigate(["dashboard"]);
        }
      })
      .catch(err => console.log(err));
  }

  loginWithTwitter() {
    this.authservice
      .signInWithTwitter()
      .then(res => {
       if (res.additionalUserInfo.isNewUser) this.profile.createUser(res.user);
        else this.router.navigate(["dashboard"]);
      })
      .catch(err => console.log(err));
  }

  loginWithGithub() {
    this.authservice
      .signInWithGithub()
      .then(res => {
        if (res.additionalUserInfo.isNewUser) this.profile.createUser(res.user);
        else this.router.navigate(["dashboard"]);
      })
      .catch(err => console.log(err));
  }
}
