export default () => ({
    message_url: process.env.MESSAGE_URL || 'http://ip:port/path',
    app_id: process.env.APP_ID || 'EUCP-EMY-DDDD-3EEEE',
    sign: process.env.SIGN || 'PIEUDJI987EUID62PKEDSESQEDSEDFSE',
})
