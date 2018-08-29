import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { User } from '../models/user.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as firebase from "firebase";


@Injectable({
  providedIn: 'root'
})
export class TodoService {

  private userCol: AngularFirestoreCollection<User>;
  private users: Observable<User[]>;
  public doc_id: string;

  constructor(private afs: AngularFirestore) { }

  loadUserTodoList(userId) {
    this.userCol = this.afs.collection('users', ref => ref.where('id', '==', userId));
    this.users = this.userCol.snapshotChanges().pipe(
      map(docArray => {
        return docArray.map(doc => {
          const data = doc.payload.doc.data() as User;
          const id= doc.payload.doc.id;
          this.doc_id=id;
          return { id,...data };
        })
      }));  
    return this.users;
  }


  addtodoItem(todoitem: string) {
    console.log("Doc id inside add to-service-todo"+this.doc_id);
    var userRef = this.afs.collection('users').doc(this.doc_id);
    userRef.update({
      todoList: firebase.firestore.FieldValue.arrayUnion(todoitem)
    });
  }

  deleteTodoItem(todoitem: string) {
    var userRef = this.afs.collection('users').doc(this.doc_id);
    userRef.update({
      todoList: firebase.firestore.FieldValue.arrayRemove(todoitem)
    });
  }

  deleteAll() {
    var userRef = this.afs.collection('users').doc(this.doc_id);
    userRef.update({
      todoList: firebase.firestore.FieldValue.delete()
    });
  }

}
