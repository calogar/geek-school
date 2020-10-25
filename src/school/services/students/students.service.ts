import { Injectable } from '@nestjs/common';
import { Student } from 'src/school/models/student.model';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult, InsertResult } from 'typeorm';

@Injectable()
export class StudentsService {
    
    constructor (
        @InjectRepository(Student)
        private _repository: Repository<Student>,
    ) {}

    /**
     * Get a single Student by its uuid.
     * @param {string} uuid The Student identifier.
     */
    findByUuid(uuid: string): Student {
        const student: Student = {
            uuid: '1',
            name: 'Carlos',
            surname: 'López',
            address: 'Here',
            location: 'There',
            postalCode: 12345,
            course: 'My Course',
            active: true
        }
        return student;
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
        throw Error('The Student with the uuid ' + uuid + 'was not found.');
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
     */
    async create(newStudent: Student): Promise<Student> {
        return await this._repository.save({ ...newStudent, uuid: undefined, active: true });
    }

    /**
     * Update a single student. It cannot be updated if it is already deleted.
     * @param {string} uuid The Student id.
     * @param {Student} updateStudent The Student to update.
     */
    async update(uuid: string, updateStudent: Student): Promise<Student> {
        await this.findOne(uuid); // This will throw if not found.
        return await this._repository.save({ ...updateStudent, uuid: uuid, active: true });
    }   
    
    /**
     * Delete a single Student (soft delete).
     * @param {string} uuid The Student id.
     * @returns {Promise<DeleteResult>} The result of the delete action.
     */
    async remove(uuid: string): Promise<boolean> {
        await this._repository.save({
            uuid: uuid,
            active: false,
        });
        return true;
    }
}
