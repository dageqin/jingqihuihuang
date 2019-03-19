const path = require('path');
const uglify = require('uglifyjs-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const extractTextPlugin = require('extract-text-webpack-plugin');
const glob = require('glob');
const PurifyCSSPlugin = require("purifycss-webpack");
module.exports = {
    mode: 'development',
    //入口文件
    entry: './src/index.js',
    //指定输出的目录和文件名
    output: {
        path: path.resolve(__dirname, '../dist'),//保存的目录
        filename: 'index.js' //保存的文件名
    },
    devServer: {
        inline: true,
        host: 'localhost',
        port: 8080,
        contentBase: path.resolve(__dirname, '../dist'),
        compress: true
    },
    //设置模块的属性
    module: {
        //可以设置多个loaders,加载器
        rules: [
            //每个对象都 设置一种类型的文件的加载器
            {
                test: /\.(htm|html)$/i,
                use:[ 'html-withimg-loader']
            },
            {
                test: /\.css$/,
                use: extractTextPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader"
                })
            },
            {
                test: /\.(eot|woff|woff2|ttf|svg)$/,
                loader: 'url'
            },
            {
                test: /\.(jpg|png|gif|jpeg|bmp)$/,
                use:[{
                    loader: 'url-loader',
                    options: {
                        limite: 500
                    }
                }]

            }
        ]
    },
    plugins: [
        new uglify(),
        new HtmlWebpackPlugin({
            title: "京旗辉煌",
            filename: "./index.html",
            template: "./src/index.html",
            inject: "body",
            favicon: './src/images/favicon.ico', // 添加小图标
            minify: {
                caseSensitive: false,//是否大小写敏感
                collapseBooleanAttributes: true,//是否大小写敏感
                collapseWhitespace: true//是否大小写敏感
            },
            hash: true,
            cache: true,
            showErrors: true,
            chunks: "",
            chunksSortMode: "auto",
            excludeChunks: "",
            xhtml: false
        }),
        /*new HtmlWebpackPlugin({
            minify:{ //是对html文件进行压缩
                removeAttributeQuotes:true  //removeAttrubuteQuotes是却掉属性的双引号。
            },
            template: './src/index.html',
            hash: true
        }),*/
        new extractTextPlugin('css/style.css'),
        new PurifyCSSPlugin({
            //这里配置了一个paths，主要是需找html模板，purifycss根据这个配置会遍历你的文件，查找哪些css被使用了。
            paths: glob.sync(path.join(__dirname, 'src/*.html'))
        })
    ]
};