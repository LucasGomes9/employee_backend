import { Request, Response, NextFunction } from 'express';

export default function validationFields(
  request: Request,
  response: Response,
  next: NextFunction,
): NextFunction | void {
  const employeeKeys = Object.keys(request.body);

  for (let i = 0; i < employeeKeys.length; i += 1) {
    if (
      request.body[employeeKeys[i]] === undefined ||
      request.body[employeeKeys[i]].trim() === ''
    ) {
      throw new Error(`Invalid Camp ${employeeKeys[i]}`);
    }

    console.log(request.body[employeeKeys[i]]);
  }

  return next();
}
