import { Grade } from "../grades/models/grade";
import { Region } from "./region";

export class Student {
    id:number;
    name:string;
    lastname:string;
    email:string;
    createAt:string;
    picture:string;
    region:Region;
    grades:Grade[] = [];
}

