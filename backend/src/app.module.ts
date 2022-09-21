import { Module } from '@nestjs/common'
import { RouterModule } from '@nestjs/core'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { TodoModule } from './todo/todo.module'


@Module({
  imports: [
    TodoModule,
    RouterModule.register([
      {
        path: 'api',
        module: TodoModule,
      },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
