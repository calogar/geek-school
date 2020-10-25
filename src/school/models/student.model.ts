import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

/** 
 * Represents a student in a school.
 * It also uses TypeORM to represent the Student entity in the DB.
*/
@Entity()
export class Student {

    @PrimaryGeneratedColumn('uuid')
    uuid: string;

    @Column()
    name: string;

    @Column()
    surname: string;

    @Column()
    address: string;

    @Column()
    location: string;

    @Column()
    postalCode: number;

    @Column()
    course: string;

    @Column({ default: true })
    active: boolean;
}