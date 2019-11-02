import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';
import { Todo } from '../models/todo';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }
  login(user: User) {
    this.http.post('http://localhost:3000/login', user).subscribe();
  }
  addTodo(todo:Todo){
    this.http.post('http://localhost:3000/todos/1',todo).subscribe();
  }
  readTodos(id){
    this.http.get(`http://localhost:3000/todos/${id}`).subscribe();
  }
}
