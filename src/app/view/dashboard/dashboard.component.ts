import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { TodoService } from '../../services/todo.service';
import { Observable } from 'rxjs';
import { User } from '../../models/user.model';
import { ProfileService } from '../../services/profile.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  userData: User = {};
  public doc_id: string;
  todoItem: string='';
  currentUserId: string;

  constructor(private authservice: AuthService, private todo: TodoService) {
    console.log("dashboard initilalized" + authservice.userDetails);
    this.currentUserId = authservice.getUserId();
    console.log("User id -" + this.currentUserId);

    todo.loadUserTodoList(this.currentUserId).subscribe(user => {
      this.userData.email = user[0].email,
        this.userData.displayName = user[0].displayName,
        this.userData.todoList = user[0].todoList
    }, error => console.log(error)
    );
  }
  
  ngOnInit() {
  }

  ngOnChanges() {
    // this.todo.loadUserTodoList(this.currentUserId).subscribe(user => {
    //   this.userData = user[0];
    // });
  }

  addTodo() {
    console.log("add called");
    this.todo.addtodoItem(this.todoItem);
    this.todoItem = '';
  }

  deleteTodo(todoItem) {
    this.todo.deleteTodoItem(todoItem);
  }

  deleteAll() {
    this.todo.deleteAll();
  }

  logout() {
    this.authservice.logout();
  }
}
