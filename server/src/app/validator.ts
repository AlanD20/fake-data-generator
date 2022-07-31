import _ from 'yup';
import __ from 'lodash';
import { Response } from 'express';
import { MAX_PAGE, MAX_SIZE } from './constants';

const SEED_VALIDATOR = _.number()
  .typeError('Seed must be number')
  .required('Seed is required');

const ERROR_VALIDATOR = _.number()
  .typeError('Error must be number')
  .required('Error is required')
  .min(0, 'Error must be positive number')
  .max(1000, 'Error must be not exceed 1000 errors');

const LOCALE_VALIDATOR = _.string()
  .typeError('Locale must be string')
  .oneOf(['en', 'pl', 'es'], 'Available locales: en, pl, es')
  .optional();

interface SchemaState {
  query: object;
}

const Schemas = {
  query: _.object().shape({
    seed: SEED_VALIDATOR,
    error: ERROR_VALIDATOR,
    locale: LOCALE_VALIDATOR,
    page: _.number()
      .typeError('Page must be number')
      .min(0, 'Minimum page is 0')
      .max(MAX_PAGE, `Page number must not exceed ${MAX_PAGE}`)
      .optional(),
    size: _.number()
      .typeError('Size must be number')
      .min(1, 'Minimum size is 1')
      .max(MAX_SIZE, `Size number must not exceed ${MAX_SIZE}`)
      .optional(),
  }),
};

interface ValidatorState {
  response: Response;
  schema: keyof SchemaState;
  body: object;
}

export const validator = async (
  { response, schema, body }: ValidatorState,
  func: Function
) => {
  try {
    const validated = await Schemas[schema].camelCase().validate(body, {
      strict: true,
      stripUnknown: true,
      abortEarly: false,
    });

    const { data, error, message } = await func(validated);

    if (error) {
      throw new Error(error);
    }

    return response.status(200).json({
      message: message || 'Successful',
      status: 'success',
      code: 200,
      ...data,
    });
  } catch (err: any) {
    let errors = err.errors || [];

    return response.status(422).json({
      message: `${err}`,
      errors: errors.length > 0 ? errors : undefined,
      status: 'failed',
      code: 422,
    });
  }
};
