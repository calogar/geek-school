import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SchoolModule } from './school/school.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DB_CONFIG } from './configuration';
import { Student } from './school/models/student.model';

// The entities that will be considered by the ORM.
const ormEntities = [ Student ];

@Module({
  imports: [
    TypeOrmModule.forRoot({ ...DB_CONFIG, entities: [ ...DB_CONFIG.entities, ...ormEntities ] }),
    SchoolModule, 
    AuthModule
  ],
  controllers: [
    AppController
  ],
  providers: [
    AppService
  ],
})
export class AppModule {}
