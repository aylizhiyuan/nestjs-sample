import { HttpException, HttpStatus } from '@nestjs/common'
import { ApiErrorCode } from '../common/constants/error-code'
// 使用的时候直接通过throw 就可以了....
export class UserIdInvalidException extends HttpException {
    private errorMessage: string
    private errorCode: ApiErrorCode

    constructor(errorMessage: string, errorCode: ApiErrorCode, statusCode: HttpStatus) {
        super(errorMessage, statusCode)

        this.errorMessage = errorMessage
        this.errorCode = errorCode
    }

    getErrorCode(): ApiErrorCode {
        return this.errorCode
    }

    getErrorMessage(): string {
        return this.errorMessage
    }
}
