import { Student } from "src/app/students/student";
import { ItemGrade } from "./item-grade";

export class Grade {
    id: number;
    calendar: string;
    createAt: string;
    student: Student;
    average: number;
    item_grades: ItemGrade [] = [];
}
