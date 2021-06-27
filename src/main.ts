import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ExpressAdapter, NestExpressApplication } from '@nestjs/platform-express'
import * as helmet from 'helmet'
import * as morgan from 'morgan'
import * as compression from 'compression'
import * as RateLimit from 'express-rate-limit'
import { HttpExceptionFilter } from './filters/http-exception.filter'
async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule, new ExpressAdapter(), { cors: true })
    app.enable('trust proxy') //如果有反向代理的话，选择默认相信
    app.use(helmet())
    app.use(
        RateLimit({
            windowMs: 15 * 60 * 1000, // 15 minutes
            max: 100, // limit each IP to 100 rquest
        })
    )
    app.use(compression())
    app.use(morgan('combined'))
    app.useGlobalFilters(new HttpExceptionFilter())
    await app.listen(3000)
}
bootstrap()
