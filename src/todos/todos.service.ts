import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { Todo } from './interfaces/todos.interface';
import { todoList } from 'todos-mock';
import { TodoDTO } from './dto/todo.dto';

@Injectable()
export class TodosService {

    private readonly todos: Todo[] = [];
    private readonly logger = new Logger(TodosService.name);

    constructor() {
        this.todos = todoList;
    }

    public findAll(): Todo[] {
        this.logger.log("Returning all todos");
        return this.todos;
    }

    public findOne(id: number): Todo {
        this.logger.log(`Returning todo with id ${id}`);
        const todo: Todo | undefined = this.todos.find(todo => todo.id === id);
        if(!todo) {
            throw new NotFoundException('Todo not found!');
        }
        return todo;
    }

    public createTodo(createTodoDto: TodoDTO): Todo{
        this.logger.log("Create a new Todo");
        const maxId: number = Math.max(this.todos.length, 0);
        const id: number = maxId + 1;
        const newTodo: Todo = {
            id,
            ...createTodoDto
        };
        this.todos.push(newTodo);
        return newTodo;
    }

    public delete(id: number): Todo {
        this.logger.log(`Delete todo with id ${id}`);
        const todoDeleted : Todo | undefined = this.todos.find(todo => todo.id === id);
        if(!todoDeleted) {
            throw new NotFoundException('Todo not found!');
        }
        this.todos.filter(todo => todo.id !== id);
        return todoDeleted;
    }

    public update(id: number, todo: TodoDTO): Todo {
        this.logger.log(`Updating todo with id: ${id}`);
        const index: number = this.todos.findIndex(todo => todo.id === id);
        if(index === -1){
            throw new NotFoundException('Todo not found!');
        }
        const updatedTodo: Todo = {
            id,
            ...todo
        };
        this.todos[index] = updatedTodo;
        return updatedTodo;
    }

}
