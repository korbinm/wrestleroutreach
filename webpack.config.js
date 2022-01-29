const path = require('path');
const Dotenv = require('dotenv-webpack');
const HtmlWebPackPlugin = require('html-webpack-plugin');


module.exports = {
    entry: './src/index.js',
    output : {
        path: path.resolve(__dirname, 'dist'),
        filename:'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                include: path.resolve(__dirname, 'src'),
                exclude: /node_modules\/(?!()\/).*/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env", "@babel/preset-react"],
                    },
                },
            },
            {
                test:/\.(gif|png|jpe?g|svg)$/i,
                use: {
                    loader: 'file-loader'
                }

            },
            {
                test: /\.html$/,
                use: "html-loader",
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
        ],
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: "./public/index.html",
            filename: "./index.html",
        }),
    ],
    devServer: {
        static: path.resolve(__dirname, 'dist'),
        historyApiFallback: true,
        open: true
    },
    resolve: {
        alias: {
            "react-native": "react-native-web"
        },
        extensions: [".web.js",".js",".jsx",".ts",".tsx"]
    },
};
// module.exports = {
//     entry: path.resolve(__dirname, 'src') + '/index.js',
//     output: {
//         path: path.resolve(__dirname, 'dist') + '/src',
//         filename: 'bundle.js',
//         publicPath: '/src/'
//     },
//     resolve: {
//         extensions: [".mjs", ".js"],
//         fallback: {
//             "path": require.resolve("path-browserify")
//         }
//     },
//     plugins: [
//         new Dotenv()
//     ]
// }