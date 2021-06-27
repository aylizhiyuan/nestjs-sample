import { Module } from '@nestjs/common'
import { SendMessageController } from './sendMessage.controller'
import { SendMessageService } from './sendMessage.service'
import { ConfigModule } from '@nestjs/config'
import { ContextService } from '@/providers/context.service'

@Module({
    imports: [ConfigModule],
    providers: [SendMessageService, ContextService],
    controllers: [SendMessageController],
    exports: [SendMessageService],
})
export class SendMessageModule {}
