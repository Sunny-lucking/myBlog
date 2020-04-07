module.exports = {
    lintOnSave: false,
    publicPath:'/',
    productionSourceMap: false, // 生产环境不产生未加密的map文件
    configureWebpack: {
        externals: {
            Vue: "Vue",
            Vuex: "Vuex",
            "element-ui": "ELEMENT",
            VueRouter: "vue-router",
            axios: "axios"
        }
    }

}
