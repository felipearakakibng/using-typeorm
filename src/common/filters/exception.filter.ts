import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from "@nestjs/common";

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    if (!(exception instanceof HttpException)) {
      return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        timestamp: new Date().toISOString(),
        path: request.url,
        message: "Internal Server Error",
      });
    }

    const exceptionHttp: HttpException = exception;

    const exceptionReponse = exceptionHttp.getResponse();

    const excpetionReponseObj =
      exceptionReponse instanceof Object ? exceptionReponse : {};

    response.status(exceptionHttp.getStatus()).json({
      timestamp: new Date().toISOString(),
      path: request.url,
      ...excpetionReponseObj,
    });
  }
}
