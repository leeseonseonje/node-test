import {BackEndFramework} from "./BackEndFramework";
import {Injectable} from "@nestjs/common";

@Injectable()
export class NestJS implements BackEndFramework {

    crud() {
        console.log(`BackEndFramework: ${NestJS.name}`);
    }
}