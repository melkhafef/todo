import { Component, OnInit } from '@angular/core';
import { Todo } from '../models/todo';
import { UserService } from '../services/user.service';
@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {
  todo:Todo;
  todos;
  constructor(private userService:UserService) { }

  ngOnInit() {
    this.todo=new Todo();
  }
  addTodo(){
    this.userService.addTodo(this.todo);
  }
  

}
