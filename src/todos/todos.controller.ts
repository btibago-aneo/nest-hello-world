import { Controller, Get, Param, Post, ParseIntPipe, Body, HttpException, HttpStatus, Put, Delete } from '@nestjs/common';
import { ApiTags, ApiResponse,ApiOkResponse, ApiNotFoundResponse,ApiCreatedResponse } from '@nestjs/swagger';
import { TodosService } from './todos.service';
import { Todo } from './interfaces/todos.interface';

@Controller('todos')
@ApiTags('todos')
export class TodosController {
    constructor(private readonly todoService: TodosService) {}

    @Get()
    @ApiResponse({ description: 'Todos retrieved successfully.'})
    public getAll(): Array<Todo> {
        try{
            return this.todoService.findAll();
        } catch(error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    @Get(':id')
    @ApiOkResponse({ description: 'Todo retrieved successfully.'})
    @ApiNotFoundResponse({ description: 'Todo not found!'})
    public findOne(@Param('id', ParseIntPipe) id:number): Todo {
        try {
            return this.todoService.findOne(id);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
        
    }

    @Post()
    @ApiCreatedResponse({ description: 'Todo created successfully. '})
    public create(@Body() todo: Todo) : Todo {
        try {
            return this.todoService.createTodo(todo);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Put(':id')
    @ApiOkResponse({ description: 'Todo updated successfully.'})
    @ApiNotFoundResponse({ description: 'Todo not found!'})
    public update(@Param('id', ParseIntPipe) id: number, @Body() todo: Todo): Todo{
        try {
            return this.todoService.update(id, todo);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    
    @Delete(':id')
    @ApiOkResponse({ description: 'Todo deleted successfully.'})
    @ApiNotFoundResponse({ description: 'Todo not found.' })
    public delete(@Param('id', ParseIntPipe) id:number): void {
        try{
            this.todoService.delete(id);
        } catch(error){
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


}
