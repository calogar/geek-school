import { Injectable } from '@nestjs/common';
import { Student } from 'src/school/models/student.model';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class StudentsService {
    
    constructor (
        @InjectRepository(Student)
        private _repository: Repository<Student>,
    ) {

        // Add mock data into the DB.
        this.addMock();
    }

    /**
     * Find one active Student by its id.
     * @param {string} uuid The Student id.
     * @returns {Promise<Student>} Resolves to the selected Student.
     */
    async findOne(uuid: string): Promise<Student> {
        const student = await this._repository.findOne(uuid);
        if (student && student.active)
            return student;
        return null;
    }

    /**
     * Find all active Students.
     * @returns {Promise<Student>} Resolves to all the selected Students.
     */
    async findAll(): Promise<Student[]> {
        return await this._repository.find({ where: { active: true } });
    }

    /**
     * Creates a new Student.
     * @param {Student} newStudent The Student to create.
     * @returns {Promise<Student>} The created Student.
     */
    async create(newStudent: Student): Promise<Student> {
        return await this._repository.save({ ...newStudent, uuid: undefined, active: true });
    }

    /**
     * Update a single student. It cannot be updated if it is already deleted.
     * @param {string} uuid The Student id.
     * @param {Student} updateStudent The Student to update.
     * @returns {Promise<Student>} The updated Student.     
     */
    async update(uuid: string, updateStudent: Student): Promise<Student> {
        let student = await this.findOne(uuid);
        if (!student)
            return null;
        student = {
            ...student,
            ...updateStudent, 
            uuid: uuid, 
            active: true
        };
        return await this._repository.save(student);
    }   
    
    /**
     * Delete a single Student (soft delete).
     * @param {string} uuid The Student id.
     * @returns {Promise<boolean>} The result of the delete action.
     */
    async remove(uuid: string): Promise<boolean> {
        await this._repository.save({
            uuid: uuid,
            active: false,
        });
        return true;
    }

    /**
     * Add mock data to the database.
     */
    async addMock(): Promise<void> {
        const students: Student[] = [
            {
                uuid: '1',
                name: 'Carlos',
                surname: 'López',
                address: 'Here',
                location: 'There',
                postalCode: 12345,
                course: 'My Course',
                active: true
            },
            {
                uuid: '2',
                name: 'John',
                surname: 'Doe',
                address: 'Here',
                location: 'There',
                postalCode: 12345,
                course: 'My Course',
                active: true
            },
            {
                uuid: '3',
                name: 'Hannah',
                surname: 'Doe',
                address: 'Here',
                location: 'There',
                postalCode: 12345,
                course: 'My Course',
                active: true
            }
        ];
        for(let i = 0; i< students.length; i++) 
            await this.create(students[i]);
    }
}
