import Joi from 'joi';
import dotenv from 'dotenv'

const env = process.env.NODE_ENV || 'dev'
dotenv.config({path: `.env.${env}`})

export interface EnvSchemaType{
    SERVER_PORT: number;
    DATABASE_HOST:string;
    DATABASE_USER:string;
    DATABASE_PASSWORD:string;
}

export const EnvSchemaJoi = Joi.object({
    SERVER_PORT: Joi.number().required(),
    DATABASE_HOST: Joi.string().required(),
    DATABASE_USER: Joi.string().required(),
    DATABASE_PASSWORD: Joi.string().required()
}).unknown();

const { error, value } = EnvSchemaJoi.validate(process.env, { abortEarly: false })

if(error){
    console.error(`Error en las variables de entorno: ${error.details.map((x)=> x.message).join(', ')}`)
    process.exit(1)
}

export const EnvConfig:EnvSchemaType = value as EnvSchemaType;
