import { Body, Controller, Delete, Get, Param, Post, Put, Res } from '@nestjs/common'
import { Response } from 'express'
import { CreateTodoDto } from './dto/create-todo.dto'
import { UpdateTodoDto } from './dto/update-todo.dto'
import { TodoService } from './todo.service'


@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post()
  async create(@Res() res: Response, @Body() createTodoDto: CreateTodoDto) {
    const success = await this.todoService.create(createTodoDto)
    res.status(success ? 201 : 409).send()
  }

  @Get()
  async findAll() {
    return this.todoService.findAll()
  }

  @Get(':id')
  async findOne(@Res() res: Response, @Param('id') id: string) {
    const todo = await this.todoService.findOne(+id)
    if (todo) {
      res.json(todo)
    }
    res.status(404).send()
  }

  @Put(':id')
  async update(
    @Res() res: Response,
    @Param('id') id: string,
    @Body() updateTodoDto: UpdateTodoDto
  ) {
    const success = await this.todoService.update(+id, updateTodoDto)
    res.status(success ? 200 : 409).send()
  }

  @Delete(':id')
  async remove(@Res() res: Response, @Param('id') id: string) {
    const success = await this.todoService.remove(+id)
    res.status(success ? 200 : 404).send()
  }
}
