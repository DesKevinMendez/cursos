import './styles.css'
import { Todo, TodoList } from './classes'

const todoList = new TodoList();
const tarea = new Todo('Aprender javascript')

todoList.nuevoTodo(tarea)