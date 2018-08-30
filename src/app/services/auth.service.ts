import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

import { AngularFireAuth } from "angularfire2/auth";
import * as firebase from "firebase";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  private user: Observable<firebase.User>;
  public userDetails: firebase.User = null;

  constructor(private router: Router, private auth: AngularFireAuth) {
    this.authenticateUser();
  }

  authenticateUser() {
    this.user = this.auth.authState;
    this.user.subscribe(user => {
      if (user) {
        this.userDetails = user;
        this.router.navigate(["dashboard"]);
      } else {
        this.userDetails = null;
        this.router.navigate(["home"]);
      }
    });
  }

  signUpRegular(email: string, password: string) {
    const credential = firebase.auth.EmailAuthProvider.credential(
      email,
      password
    );
    return this.auth.auth.createUserWithEmailAndPassword(email, password);
  }

  signInRegular(email: string, password: string) {
    const credential = firebase.auth.EmailAuthProvider.credential(
      email,
      password
    );
    return this.auth.auth.signInWithEmailAndPassword(email, password);
  }

  signInWithTwitter() {
    return this.auth.auth.signInWithPopup(
      new firebase.auth.TwitterAuthProvider()
    );
  }

  signInWithFacebook() {
    return this.auth.auth.signInWithPopup(
      new firebase.auth.FacebookAuthProvider()
    );
  }

  signInWithGoogle() {
    return this.auth.auth.signInWithPopup(
      new firebase.auth.GoogleAuthProvider()
    );
  }

  signInWithGithub() {
    return this.auth.auth.signInWithPopup(
      new firebase.auth.GithubAuthProvider()
    );
  }

  isLoggedIn() {
    if (this.userDetails == null) {
      return false;
    } else {
      return true;
    }
  }

  logout() {
    this.auth.auth.signOut().then(res => this.router.navigate(["/home"]));
  }

  getUserId() {
    console.log("get user Id called" + this.userDetails.uid);
    return this.userDetails.uid;
  }
}
