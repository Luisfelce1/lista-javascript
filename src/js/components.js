import { Todo } from '../classes/todo.class';

import { todoList } from '../index';

//Referencias en el html element
const divTodoList = document.querySelector('.todo-list');
const txtInput = document.querySelector('.new-todo');
const btnBorrar = document.querySelector('.clear-completed');
const ulFiltros = document.querySelector('.filters');
const anchorFiltros = document.querySelectorAll('.filtro');


export const crearTodoHtml = (todo) => {

    //string del html
    const htmlTodo = `
    <li class="${(todo.completado) ? 'completed' : ''}" data-id="${todo.id}">
		<div class="view">
			<input class="toggle" type="checkbox" ${(todo.completado) ? 'checked' : ''}>
			<label>${todo.tarea}</label>
			<button class="destroy"></button>
		</div>
		<input class="edit" value="Create a TodoMVC template">
	</li>`;

    const div = document.createElement('div');
    div.innerHTML = htmlTodo;
    divTodoList.append(div.firstElementChild);
    return div.firstElementChild;
}

//Eventos
txtInput.addEventListener('keyup', (event) => {

    if (event.keyCode === 13 && txtInput.value.length > 0) {
        console.log(txtInput.value);
        const nuevoTodo = new Todo(txtInput.value);
        todoList.nuevoTodo(nuevoTodo);

        crearTodoHtml(nuevoTodo);
        txtInput.value = '';
    }

});

divTodoList.addEventListener('click', () => {

    const nombreElemento = event.target.localName; //extraer elemento input, label o button
    const todoElemento = event.target.parentElement.parentElement;// extraer el <li>
    const todoId = todoElemento.getAttribute('data-id')// extraer id del elemento de la lista

    console.log(nombreElemento);

    //marcar todo como completado 
    if (nombreElemento.includes('input')) {

        todoList.marcarCompletado(todoId);
        todoElemento.classList.toggle('completed')

    } else if (nombreElemento.includes('button')) { //hay que borrar el todo

        todoList.eliminarTodo(todoId);
        divTodoList.removeChild(todoElemento);
        console.log(todoElemento);
    }
});

btnBorrar.addEventListener("click", () => {
    todoList.eliminarCompletados();
    const completados = document.querySelectorAll(".completed");
    for (const completado of completados) {
      completado.remove();
    }
  });

  ulFiltros.addEventListener('click', (event) => {
      const filtro = event.target.text;
      if(!filtro ){return;}

      anchorFiltros.forEach(elem => elem.classList.remove('selected'));
      event.target.classList.add('selected');

      for(const elemento of divTodoList.children) {
          elemento.classList.remove('hidden');
          const completado = elemento.classList.contains('completed');

          switch(filtro) {
              case 'Pendientes':
                  if(completado) {
                      elemento.classList.add('hidden');
                  }
              break;

              case 'Completados':
                if(!completado) {
                    elemento.classList.add('hidden');
                }
            break;
          }
      }
  })