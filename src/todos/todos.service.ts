import { Injectable, NotFoundException } from '@nestjs/common';
import { Todo } from './todo.interface';

@Injectable()
public class TodosService {
  private todos: Todo[] = [];
  private idCounter = 1;

  create(title: string): Todo {
    const newTodo: Todo = {
      id: this.idCounter++,
      title,
      done: false,
    };
    this.todos.push(newTodo);
    return newTodo;
  }

  findAll(): Todo[] {
    return this.todos;
  }

  findOne(id: number): Todo {
    const todo = this.todos.find(t => t.id === id);
    if (!todo) {
      throw new NotFoundException(`Todo with ID ${id} not found`);
    }
    return todo;
  }

  update(id: number, updateData: Partial<Todo>): Todo {
    const todo = this.findOne(id);
    if (updateData.title !== undefined) todo.title = updateData.title;
    if (updateData.done !== undefined) todo.done = updateData.done;
    return todo;
  }

  remove(id: number): { message: string } {
    const index = this.todos.findIndex(t => t.id === id);
    if (index === -1) {
      throw new NotFoundException(`Todo with ID ${id} not found`);
    }
    this.todos.splice(index, 1);
    return { message: `Todo with ID ${id} deleted successfully` };
  }
}
