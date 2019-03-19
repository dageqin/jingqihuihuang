
const path = require('path');
module.exports = {
    //入口文件
    entry:'./src/js/index.js',
    //指定输出的目录和文件名
    output:{
        path:'./dist',//保存的目录
        filename:'bundle.js'//保存的文件名
    },
    devServer:{
        inline:true,
        port:8080,
        contentBase:'./build'
    },
    //设置模块的属性
    module:{
        //可以设置多个loaders,加载器
        loaders:[
            //每个对象都 设置一种类型的文件的加载器
            {
                test:/\.js$/, //匹配的是后缀为.js的文件
                loader:'babel?presets[]=es2015',
                exclude:/node_modules/  //把node_modules下面的文件全部排除掉不解析不转译
                /*query:{presets:["es2015"]}*/
            },
            // {
            //     test:/\.less$/,
            //     /**
            //      * less 把less文件编译成css文件
            //      * css 返回css代码
            //      * style 负责把css文件变成style标签 插入到页面中
            //      * 如果有多个加载器，肯定是从右向左传递数据，用感叹号分隔
            //      */
            //     loader:'style!css!less'
            // },
            // {
            //     test:/\.css$/,
            //     loader:'style!css'
            // },
            {
                test:/\.(eot|woff|woff2|ttf|svg)$/,
                loader:'url'
            },
            {
                test :/\.(jpg|png|gif|jpeg|bmp)$/,
                loader:'url'
            }
        ]
    },
    plugins:[
        new HtmlWebpackPlugin({
            template:'./app/index.html'
        }),
        new OpenBrowserWebpackPlugin({
            url:'http://localhost:9000'
        })
    ]
}