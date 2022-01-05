import { Component, OnInit } from '@angular/core';
import { FormBuilder} from '@angular/forms';
import {trigger, state, style, animate, transition, animation} from '@angular/animations'

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
  animations: [
    trigger('openClose', [
      state('open', style({
        right:'1px',
        opacity:1,
        backgroundColor:'white'
      })),
      state('closed', style({
        right:'-10px',
        opacity:0,
        backgroundColor:'white'
      })),
      transition('open => closed', [
        animate('0.7s')
      ]),
      transition('closed => open', [
        animate('0.5s')
      ]),
    ])
  ]
})
export class TodoComponent implements OnInit {
  todoList: any[] =[]
  
  isDisplay = false;

  // collects user inputs
  newTodo = this.formBuilder.group({
    todoItem: ''
  })

  constructor(private formBuilder: FormBuilder) { 
    
  }
  // add item ti the todo list
  addTodo(){
    const value =this.newTodo.value.todoItem
    this.todoList.push({id: this.todoList.length, name: value})
    window.localStorage.setItem('todo', JSON.stringify(this.todoList))
    this.newTodo.reset();
  }

  // mark item as compplete
  markCompleted(value: any) {
    value.completed = !value.completed
    value.completed === true ? 
    this.todoList.push(this.todoList.splice(this.todoList.indexOf(value), 1)[0]) :
    this.todoList.unshift(this.todoList.splice(this.todoList.indexOf(value), 1)[0])
    window.localStorage.setItem('todo', JSON.stringify(this.todoList))
  }

  // delete item from the list
  remove(i:any){
    this.todoList.splice(i, 1)
    window.localStorage.setItem('todo', JSON.stringify(this.todoList))
  }

// fixed bottom button to open and close the search form
  showFormContainer() {
    this.isDisplay  = !this.isDisplay;

  }

  ngOnInit(): void {
    this.todoList =  JSON.parse(localStorage.getItem('todo') || '{}')
  }

}
