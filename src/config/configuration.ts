export default () => ({
    message_url: process.env.MESSAGE_URL || 'http://ip:port/inter/sendPersonalitySMS',
    app_id: process.env.APP_ID || '',
    gzip: process.env.gzip || true,
})
