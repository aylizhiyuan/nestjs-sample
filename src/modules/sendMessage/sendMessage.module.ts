import { Module } from '@nestjs/common'
import { SendMessageController } from './sendMessage.controller'
import { SendMessageService } from './sendMessage.service'
import { ConfigModule } from '@nestjs/config'
import { ContextService } from '../../providers/context.service'
import { HttpModule } from '@nestjs/common'
import { UtilsService } from '../../providers/utils.service'
@Module({
    imports: [ConfigModule, HttpModule],
    providers: [SendMessageService, ContextService, UtilsService],
    controllers: [SendMessageController],
    exports: [SendMessageService],
})
export class SendMessageModule {}
