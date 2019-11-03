import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';
import { Todo } from '../models/todo';
import { map } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }
  login(user: User) {
    return this.http.post<any>('http://localhost:3000/login', user).pipe(map(user => {
      localStorage.setItem('currentUser', JSON.stringify(user));
      this.currentUserSubject.next(user);
      return user;
    }));
  }
  addTodo(id: number, todo: Todo) {
    return this.http.post(`http://localhost:3000/user/${id}/todos`, todo).subscribe();
  }
  getTodos(id:number) {
    return this.http.get(`http://localhost:3000/user/${id}/todos`).subscribe(data=>{
      console.log(data);
      localStorage.setItem(`user_todos`,JSON.stringify(data));
    });
  }
}
