import { HttpException, HttpStatus } from '@nestjs/common';

export class CustomHttpException extends HttpException {
  constructor(args: {
    errors?: Record<string, string>;
    message?: string;
    status: HttpStatus;
  }) {
    super(
      { status: args.status, errors: args.errors, message: args.message },
      args.status,
    );
  }
}
