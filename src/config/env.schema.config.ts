import Joi from 'joi';
import dotenv from 'dotenv'

const env = process.env.NODE_ENV || 'dev'
dotenv.config({path: `.env.${env}`})

export interface EnvSchemaType{
    SERVER_PORT: number;
    DATABASE_HOST:string;
    DATABASE_USER:string;
    DATABASE_PASSWORD:string;
    HUGGINGFACE_API_KEY:string;
    DATABASE_PORT:number;
    DATABASE_NAME:string;
    KEY_ENCODER_CRYPTO:string;
    API_PREFIX:string;
}

export const EnvSchemaJoi = Joi.object<EnvSchemaType>({
    SERVER_PORT: Joi.number().required(),
    DATABASE_HOST: Joi.string().required(),
    DATABASE_USER: Joi.string().required(),
    DATABASE_PASSWORD: Joi.string().required(),
    HUGGINGFACE_API_KEY:Joi.string().required(),
    DATABASE_PORT: Joi.number().required(),
    DATABASE_NAME: Joi.string().required(),
    KEY_ENCODER_CRYPTO: Joi.string().required(),
    API_PREFIX:Joi.string().required()
}).unknown();

const { error, value } = EnvSchemaJoi.validate(process.env, { abortEarly: false })

if(error){
    console.error(`Error en las variables de entorno: ${error.details.map((x)=> x.message).join(', ')}`)
    process.exit(1)
}

export const EnvConfig:EnvSchemaType = value as EnvSchemaType;
