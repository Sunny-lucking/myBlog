const CompressionPlugin = require("compression-webpack-plugin");
module.exports = {
    lintOnSave: false,
    publicPath:'/',
    // productionSourceMap: false, // 生产环境不产生未加密的map文件
    configureWebpack: {
        plugins:[
            new CompressionPlugin({//gzip压缩配置
                test:/\.js$|\.html$|\.css/,//匹配文件名
                threshold:10240,//对超过10kb的数据进行压缩
                deleteOriginalAssets:false,//是否删除原文件
            })
            ],
        externals: {
            Vue: "Vue",
            Vuex: "Vuex",
            "element-ui": "ELEMENT",
            VueRouter: "vue-router",
            axios: "axios"
        }
    }

}
