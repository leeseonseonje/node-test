import { BackEndFramework } from "./BackEndFramework";
import { Injectable } from "@nestjs/common";

@Injectable()
export class NestJS implements BackEndFramework {

  crud() {
    return NestJS.name;
  }
}