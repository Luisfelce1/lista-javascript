
export class Todo {

    //instrucción para recuperar o crear una nueva instancia en base a valores que vienen del localstorage.
    static fromJson({id, tarea, completado, creado}) {
        const tempTodo = new Todo(tarea);
        tempTodo.id = id;
        tempTodo.completado = completado;
        tempTodo.creado = creado;

        return tempTodo;
    }

    constructor (tarea) {

        this.tarea = tarea;

        this.id = new Date().getTime(); //para este caso usaremos la hora y fecha como el id.
        this.completado = false;
        this.creado = new Date();
    }

    imprimirClase() {
        console.log(`${this.tarea} - ${this.id}`);
    }
}

