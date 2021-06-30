import { Injectable, Logger, HttpService } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import * as qs from 'qs'
import { UtilsService } from '../../providers/utils.service'
import * as moment from 'moment'
const path = require('path')
const fs = require('fs')
const async = require('async')
const { range } = require('lodash')

@Injectable()
export class SendMessageService {
    constructor(private readonly configService: ConfigService, private readonly httpService: HttpService) {}
    public SendMessage() {
        const message_url = this.configService.get('message_url')
        const appId = this.configService.get('app_id')
        const sign = this.configService.get('sign')
        const timestamp = 20170101120000
        // const timerTime = 20171211022000
        const custormSmsId = 10001
        const extendedCode = 123
        const mobiles = range(100)
        const content = 'My Active Href: http://ip:port/path'
        let res
        return new Promise((resolve, reject) => {
            async.mapLimit(
                mobiles,
                2,
                async () => {
                    res = await this.httpService.get(message_url, {
                        params: {
                            appId,
                            sign,
                            timestamp,
                            custormSmsId,
                            mobiles,
                            content,
                            extendedCode,
                        },
                        paramsSerializer: (params) => {
                            return qs.stringify(params, { arrayFormat: 'comma' })
                        },
                    })
                    if (res.data.code === 'SUCCESS') {
                        Logger.log('发送成功')
                        const successPath = path.join(__dirname, 'access.txt')
                        if (UtilsService.isFile(successPath)) {
                            const successInfo = res.data.data.map((item) => {
                                return `[${moment().format('YYYY-MM-DD HH:mm:ss')}]-${item.mobile}发送成功\n`
                            })
                            fs.appendFile(successPath, successInfo.join(''), function () {
                                Logger.log('文件读写成功')
                            })
                        }
                    } else {
                        Logger.log('发送失败')
                        const errorPath = path.join(__dirname, 'error.txt')
                        if (UtilsService.isFile(errorPath)) {
                            const errorInfo = res.data.data.map((item) => {
                                return `[${moment().format('YYYY-MM-DD HH:mm:ss')}]-${item.mobile}发送失败\n`
                            })
                            fs.appendFile(errorPath, errorInfo.join(''), function () {
                                Logger.log('文件读写成功')
                            })
                        }
                    }
                },
                (err, result) => {
                    if (err) {
                        return reject({ code: '9999', message: '发送失败' })
                    }
                    return resolve({ code: '2000', message: '发送成功' })
                }
            )
        })
    }
}
