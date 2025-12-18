import 'dotenv/config';
import * as joi from 'joi';

const validateEnv = joi
  .object({
    PORT: joi.number().required(),
    ORDERS_MICROSERVICE_PORT: joi.number().required(),
    ORDERS_MICROSERVICE_HOST: joi.string().required(),
  })
  .unknown(true);

const { error, value: envVars } = validateEnv.validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

export const envConfig = {
  port: envVars.PORT,
  ordersMicroservice: {
    host: envVars.ORDERS_MICROSERVICE_HOST,
    port: envVars.ORDERS_MICROSERVICE_PORT,
  },
};
