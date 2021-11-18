import './styles.css'
import { Todo, TodoList } from './classes'
import { crearTodoHTML } from './js/components';

const todoList = new TodoList();
const tarea = new Todo('Aprender javascript')

todoList.nuevoTodo(tarea)

crearTodoHTML(tarea)