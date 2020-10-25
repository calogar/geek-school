import { Controller, Put, Post, Delete, Param, Get, Body, UseGuards, NotFoundException } from '@nestjs/common';
import { StudentsService } from 'src/school/services/students/students.service';
import { Student } from 'src/school/models/student.model';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('students')
export class StudentsController {

    constructor (
        private _service: StudentsService
    ) {
    }

    /**
     * Get all students.
     */
    @Get('')
    async getAll(): Promise<Student[]> {
        return await this._service.findAll();
    }

    /**
     * Get a single Student by its uuid.
     * @param {string} uuid The Student identifier.
     */
    @Get(':uuid')
    async getOne(@Param('uuid') uuid: string): Promise<Student> {
        const student = await this._service.findOne(uuid);
        if (!student)
            throw new NotFoundException('The Student with the uuid ' + uuid + ' was not found.');
        
        return student;

    }

    /**
     * Create a student.
     * @param {Student} newStudent The Student to create.
     */
    @UseGuards(JwtAuthGuard)
    @Post()
    create(@Body() newStudent: Student): Promise<Student> {
        return this._service.create(newStudent);
    }

    /**
     * Update a single student.
     * @param {string} uuid The Student id.
     * @param {Student} updateStudent The Student to update.
     */
    @UseGuards(JwtAuthGuard)
    @Put(':uuid')
    update(@Param('uuid') uuid: string, @Body() updateStudent: Student): Promise<Student> {
        return this._service.update(uuid, updateStudent)
    }

    /**
     * Delete a single Student.
     * @param {string} uuid The Student id.
     */
    @UseGuards(JwtAuthGuard)
    @Delete(':uuid')
    async delete(@Param('uuid') uuid: string): Promise<boolean> {
        return await this._service.remove(uuid);
    }
}
