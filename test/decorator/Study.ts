import {LocalTime} from "js-joda";

export class Study {

    @study()
    one() {
        console.log('one');
        return 'one';
    }

    @study()
    two() {
        console.log('two');
        return 'two';
    }
}

export function study() {
    return function (target: any, key: string, descriptor: PropertyDescriptor) {
        console.log(`start: ${LocalTime.now()}`);
        // descriptor.value();
        console.log(`end: ${LocalTime.now()}`);
    };
}