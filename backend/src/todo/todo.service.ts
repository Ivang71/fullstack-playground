import { Injectable } from '@nestjs/common'
import { CreateTodoDto } from './dto/create-todo.dto'
import { UpdateTodoDto } from './dto/update-todo.dto'
import { Todo } from './entities/todo.entity'


@Injectable()
export class TodoService {
  // todo: use database like a normal person
  private todos: Todo[] = []

  async create(createTodoDto: CreateTodoDto) {
    if (this.todos.length < 300) {
      this.todos.push({
        ...createTodoDto,
        id: this.todos.length,
      })
      return true
    }
    return false
  }

  async findAll() {
    return this.todos
  }

  async findOne(id: number) {
    return this.todos.find(t => t.id === id)
  }


  async update(id: number, updateTodoDto: UpdateTodoDto) {
    if (id < this.todos.length) {
      this.todos[id] = {
        ...this.todos[id],
        ...updateTodoDto,
      }
      return true
    }
    return false
  }

  async remove(id: number) {
    if (id < this.todos.length) {
      this.todos.splice(id, 1)
      return true
    }
    return false
  }
}
