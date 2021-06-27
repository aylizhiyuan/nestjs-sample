import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common'
import { contextMiddleware } from '@/middlewares'
import configuration from '@/config/configuration'
import { ConfigModule } from '@nestjs/config'
import { SendMessageModule } from '@/modules/sendMessage/sendMessage.module'
@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            ignoreEnvFile: true,
            load: [configuration],
        }),
        SendMessageModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer): MiddlewareConsumer | void {
        consumer.apply(contextMiddleware).forRoutes('*')
    }
}
