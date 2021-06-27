import { Logger, Controller, Get, Body, Post, Request, Response, UseGuards } from '@nestjs/common'
import { SendMessageService } from './sendMessage.service'
import { ConfigService } from '@nestjs/config'
import { ContextService } from '@/providers/context.service'
@Controller()
export class SendMessageController {
    constructor(
        private readonly sms: SendMessageService,
        private readonly configService: ConfigService,
        private readonly contextService: ContextService
    ) {}

    @Post('/sendMessage')
    async sendMessage(@Body() param: { payload: any }): Promise<any> {
        const res = this.sms.SendMessage(param.payload)
        return res
    }
}
