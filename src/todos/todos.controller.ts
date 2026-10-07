import { Controller, Get, Post, Put, Delete, Body, Param, ParseIntPipe } from '@nestjs/common';
import { TodosService } from './todos.service';
import { Todo } from './todo.interface';

@Controller('todos')
public class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Post()
  create(@Body('title') title: string): Todo {
    return this.todosService.create(title);
  }

  @Get()
  findAll(): Todo[] {
    return this.todosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Todo {
    return this.todosService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateData: Partial<Todo>,
  ): Todo {
    return this.todosService.update(id, updateData);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.todosService.remove(id);
  }
}
