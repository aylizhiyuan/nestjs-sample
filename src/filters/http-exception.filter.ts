import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common'
import { UserIdInvalidException } from '../exceptions/user-id-invalid'

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: Record<string, any>, host: ArgumentsHost): any {
        const ctx = host.switchToHttp()
        const response = ctx.getResponse()

        const request = ctx.getRequest()
        const status = exception.getStatus()
        if (exception instanceof UserIdInvalidException) {
            //针对我们自定义的异常我们就直接在这里进行处理
            response.status(status).json({
                errorCode: exception.getErrorCode(),
                errorMessage: exception.getErrorMessage(),
                date: new Date().toLocaleDateString(),
                path: request.url,
            })
        } else {
            response.status(status).json({
                statusCode: status,
                data: new Date().toLocaleDateString(),
                path: request.url,
                message: exception.message, //可视情况是否加message
            })
        }
    }
}
