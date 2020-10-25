import { TypeOrmModuleOptions } from "@nestjs/typeorm";

/** 
 * File where the main app configuration is stored.
*/

export const DB_CONFIG: TypeOrmModuleOptions = {
    type: 'mysql',
    host: 'db',
    port: 3306,
    username: 'root',
    password: 'root',
    database: 'school',
    entities: [], // We specify the entities in the App Module.
    synchronize: true,
};

export const JWT_CONFIG = {
    secret: 'secretKey',
};