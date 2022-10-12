import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { Developer } from "./develop/Developer";
import { NestJS } from "./develop/NestJS";

@Module({
  imports: [],
  controllers: [AppController],
  providers: [Developer, NestJS]//{
  // provide: 'impl', useClass: NestJS,
  // }],
})
export class AppModule {
}
