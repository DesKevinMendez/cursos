import { Todo } from "."

export class TodoList {
  constructor() {
    this.cargarLocalStorage()
  }

  nuevoTodo(todo) {
    this.todos.push(todo)
    this.guardarLocalStorage()
  }

  eliminarTodo(id) {
    this.todos = this.todos
      .filter(todo => todo.id != id)
    this.guardarLocalStorage()
  }

  marcarCompletado(id) {
    for(const todo of this.todos) {
      if (todo.id == id) {
        todo.completado = !todo.completado
        break;
      }
    }
    this.guardarLocalStorage()
  }

  eliminarCompletado() {
    this.todos = this.todos
      .filter(todo => !todo.completado)
    this.guardarLocalStorage()
  }

  guardarLocalStorage() {
    localStorage.setItem('todo', JSON.stringify(this.todos))
  }

  cargarLocalStorage() {
    const todos = localStorage.getItem('todo') 
      ? JSON.parse(localStorage.getItem('todo')) 
      : []

    this.todos = todos.map(todo => Todo.toJson(todo))
  }
}