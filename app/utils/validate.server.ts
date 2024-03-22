import { json } from '@remix-run/node';
import { ValidationError } from 'yup';

export const validate = async (scheme: any, payload: object) => {
  try {
    await scheme.validate(payload);
    return null;
  } catch (error) {
    if (error instanceof ValidationError) {
      console.error(error);
      return json({
        path: error.path,
        error: error.errors[0],
      }, 400);
    } else {
      console.error(error);
      return json({
        error,
      }, 500);
    }
  }
};
