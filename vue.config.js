module.exports = {
    lintOnSave: false,
    devServer: {
        open: true,
        host: 'localhost',
        port: 8080,
        https: false,
        proxy: { // 配置跨域
            '/api': {
                target: 'http://101.37.32.66:5000/api/',
                ws: true,
                changOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    },
    publicPath:'/'
}
