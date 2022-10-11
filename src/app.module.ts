import {Module} from '@nestjs/common';
import {Developer} from "./develop/Developer";
import {NestJS} from "./develop/NestJS";

@Module({
  imports: [],
  providers: [Developer, NestJS]//{
    // provide: 'impl', useClass: NestJS,
 // }],
})
export class AppModule {
}
