import { Inject, Injectable } from "@nestjs/common";
import { BackEndFramework } from "./BackEndFramework";

@Injectable()
export class Developer {

  constructor(
    @Inject('impl')
    private readonly backEndFramework: BackEndFramework,
  ) {
  }

  develop() {
    return this.backEndFramework.crud();
  }
}