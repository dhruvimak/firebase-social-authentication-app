import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { User } from '../models/user.model';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  userData: User;

  constructor(private afs: AngularFirestore, private router: Router,private auth:AuthService) { }

  createUser(user: firebase.User) {
    console.log("got user from methods"+user.displayName);
    this.userData = {
      email: user.email,
      id: user.uid,
      displayName: user.displayName,
      todoList:[]
    }
    console.log("end of  methods"+this.userData.displayName);
    this.afs.collection('users').add(this.userData).then(res=>this.auth.authenticateUser());
    this.router.navigate(['dashboard']);
  }

}
