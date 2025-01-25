import { Injectable } from "@nestjs/common";
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from "@nestjs/typeorm";
import { EnvConfig } from "./env.schema.config";

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory{
    createTypeOrmOptions(): TypeOrmModuleOptions {
        return {
            type: 'postgres',
            host: EnvConfig.DATABASE_HOST,
            port: EnvConfig.DATABASE_PORT,
            username: EnvConfig.DATABASE_USER,
            password: EnvConfig.DATABASE_PASSWORD,
            database: EnvConfig.DATABASE_NAME,
            synchronize: true,
            autoLoadEntities: true,
            logging: ['error']
        }
    }
}