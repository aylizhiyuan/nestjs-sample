import { ConfigModule } from '@nestjs/config'
import { HttpService, HttpModule } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import { SendMessageModule } from './sendMessage.module'
import { SendMessageService } from './sendMessage.service'
import configuration from '../../config/configuration'
import { UtilsService } from '../../providers/utils.service'
import { ContextService } from '../../providers/context.service'
import { AxiosResponse } from 'axios'
describe('sendMessage service', () => {
    let sendMessageService: SendMessageService
    let httpService: HttpService
    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            imports: [
                ConfigModule.forRoot({
                    isGlobal: true,
                    ignoreEnvFile: true,
                    load: [configuration],
                }),
                SendMessageModule,
                HttpModule,
            ],
            providers: [UtilsService, ContextService],
        }).compile()
        sendMessageService = moduleRef.get<SendMessageService>(SendMessageService)
        httpService = moduleRef.get<HttpService>(HttpService)
    })

    describe('sendMessage service', () => {
        const result: AxiosResponse = {
            data: {
                code: 'SUCCESS',
                data: [
                    {
                        mobile: '15538850000',
                        smsId: '20170392833833891100',
                        customSmsId: '1553885000011111',
                        state: 'DELIVRD',
                        desc: '成功',
                        receiveTime: '2017-03-15 12:00:00',
                        submitTime: '2017-03-15 12:00:00',
                        extendedCode: '123',
                    },
                    {
                        mobile: '15538850001',
                        smsId: '20170392833833891101',
                        customSmsId: '1553885000011112',
                        state: 'DELIVRD',
                        desc: '成功',
                        receiveTime: '2017-03-15 12:00:00',
                        submitTime: '2017-03-15 12:00:00',
                        extendedCode: '123',
                    },
                ],
            },
            status: 200,
            statusText: 'OK',
            headers: {},
            config: {},
        }
        it('should return Data when called successfuly', async () => {
            // @ts-ignore
            jest.spyOn(httpService, 'get').mockImplementation(() => {
                return Promise.resolve(result)
            })
            const res = await sendMessageService.SendMessage()
            if (res.code === 2000) {
                expect(res.message).toEqual('发送成功')
            } else {
                expect(res.message).toEqual('发送失败')
            }
        })
    })
})
