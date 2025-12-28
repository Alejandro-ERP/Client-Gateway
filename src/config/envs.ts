import 'dotenv/config';
import * as joi from 'joi';

const validateEnv = joi
  .object({
    PORT: joi.number().required(),
    NATS_SERVERS: joi.array().items(joi.string()).required(),
  })
  .unknown(true);

const { error, value: envVars } = validateEnv.validate({
  ...process.env,
  NATS_SERVERS: process.env.NATS_SERVERS?.split(','),
});

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

export const envConfig = {
  port: envVars.PORT,
  natsServers: envVars.NATS_SERVERS,
};
