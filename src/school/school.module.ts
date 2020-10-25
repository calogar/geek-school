import { Module } from '@nestjs/common';
import { StudentsService } from './services/students/students.service';
import { StudentsController } from './controllers/students/students.controller';
import { Student } from './models/student.model';
import { TypeOrmModule } from '@nestjs/typeorm';

// Entities that will be injected by the ORM.
const entities = [ Student ];

@Module({
  providers: [StudentsService],
  controllers: [StudentsController],
  imports: [TypeOrmModule.forFeature(entities)],
})
export class SchoolModule {}
