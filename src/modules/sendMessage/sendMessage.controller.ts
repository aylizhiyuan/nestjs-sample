import { Logger, Controller, Get, Body, Query, Post, Request, Response, UseGuards } from '@nestjs/common'
import { SendMessageService } from './sendMessage.service'
import { ConfigService } from '@nestjs/config'
import { ContextService } from '../../providers/context.service'
@Controller()
export class SendMessageController {
    constructor(
        private readonly sms: SendMessageService,
        private readonly configService: ConfigService,
        private readonly contextService: ContextService
    ) {}

    // @Get('/sendMessage')
    // async sendMessage(): Promise<any> {
    //     return this.sms.SendMessage()
    // }
}
