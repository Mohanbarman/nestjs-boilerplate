import * as Joi from 'joi';

export const environmentValidationSchema = Joi.object({
  environment: Joi.string()
    .valid('development', 'production', 'test', 'provision')
    .default('development'),
  port: Joi.number().default(3000),
  database: {
    mongoUri: Joi.string(),
  },
});
