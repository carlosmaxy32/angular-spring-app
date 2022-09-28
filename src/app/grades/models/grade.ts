import { ItemGrade } from "./item-grade";

export class Grade {
    id: number;
    calendar: string;
    createAt: string;
    student_id: number;
    average: number;
    item_grades: ItemGrade [] = [];
}
