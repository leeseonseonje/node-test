import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { Developer } from "./develop/Developer";
import { NestJS } from "./develop/NestJS";
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'root',
    database: 'orm_test',
    autoLoadEntities: true,
    synchronize: true,
    logging: true,
  }),],
  // controllers: [AppController],
  providers: [Developer, {
  provide: 'impl', useClass: NestJS,
  }],
})
export class AppModule {
}
