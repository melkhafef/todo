import { Component, OnInit } from '@angular/core';
import { Todo } from '../models/todo';
import { UserService } from '../services/user.service';
@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {
  todo: Todo;
  todos;
  userId;
  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userId = localStorage.getItem('uid');
    this.todo = new Todo();
    this.userService.getTodos(this.userId);
    this.todos = JSON.parse(localStorage.getItem('user_todos'));
  }
  addTodo() {
    this.userService.addTodo(this.userId, this.todo);
  }


}
