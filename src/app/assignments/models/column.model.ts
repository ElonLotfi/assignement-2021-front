import { Assignment } from "../assignment.model";

export class Column {
    constructor(public name: string, public tasks: Assignment[]) {}
}