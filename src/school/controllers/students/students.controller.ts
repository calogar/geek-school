import { Controller, Put, Post, Delete, Param, Get, Body } from '@nestjs/common';
import { StudentsService } from 'src/school/services/students/students.service';
import { Student } from 'src/school/models/student.model';

@Controller('students')
export class StudentsController {

    constructor (
        private _service: StudentsService
    ) {

    }
    /**
     * Get a single Student by its uuid.
     * @param {string} uuid The Student identifier.
     */
    @Get(':uuid')
    async getOne(@Param('uuid') uuid: string): Promise<Student> {
        return await this._service.findOne(uuid);
    }

    /**
     * Get all students.
     */
    async getAll(): Promise<Student[]> {
        return await this._service.findAll();
    }

    /**
     * Create a student.
     * @param {Student} newStudent The Student to create.
     */
    @Post()
    create(@Body() newStudent: Student): Promise<Student> {
        return this._service.create(newStudent);
    }

    /**
     * Update a single student.
     * @param {string} uuid The Student id.
     * @param {Student} updateStudent The Student to update.
     */
    @Put(':uuid')
    update(@Param('uuid') uuid: string, @Body() updateStudent: Student): Promise<Student> {
        return this._service.update(uuid, updateStudent)
    }

    /**
     * Delete a single Student.
     * @param {string} uuid The Student id.
     */
    @Delete(':uuid')
    async delete(@Param('uuid') uuid: string): Promise<boolean> {
        return await this._service.remove(uuid);
    }
}
