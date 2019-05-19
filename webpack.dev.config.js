const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path');

module.exports = {
    entry: './src/ui/index.js',
    devtool: 'inline-source-map',
    output: {
        path: path.resolve(__dirname),
        filename: 'bundle.js',
        libraryTarget: 'umd'
    },

    devServer: {
        contentBase: path.resolve(__dirname) + '/src/ui',
        compress: true,
        port: 9000,
        host: 'localhost',
        open: true,
        before: (app) => {
            app.get('/api/books/', (req, res) => res.send([
                {
                    id: '1',
                    title: 'testTitle',
                    authors: 'testAut',
                    genre: 'testGen',
                    description: 'testDescription',
                    contentId: 'safasdfasf',
                    coverId: 'sdfsdfgsfgsd',
                    price: 123,
                    isAvailable: true
                },
                {
                    id: '2',
                    title: 'testTitle2',
                    authors: 'testAut2',
                    genre: 'testGen2',
                    description: 'testDescription2',
                    contentId: 'safasdfasf2',
                    coverId: 'sdfsdfgsfgsd2',
                    price: 300,
                    isAvailable: true
                },
                {
                    id: '3',
                    title: 'Test',
                    authors: 'testAut',
                    genre: 'testGen',
                    description: 'testDescription2',
                    contentId: 'safasdfasfsdfsdf',
                    coverId: 'sdfsdfgsfgsdsdfsdf',
                    price: 256,
                    isAvailable: false
                }
            ]));
            app.get('/api/books/1', (req, res) => res.send([
                {
                    id: '1',
                    title: 'Привяу',
                    authors: 'testAut',
                    genre: 'testGen',
                    description: 'testDescription',
                    contentId: 'safasdfasfsdfsdf',
                    coverId: 'sdfsdfgsfgsdsdfsdf',
                    quantity: 5,
                    price: 640
                }
            ]));
            app.post('/api/books/', (req, res) => res.send(
                {id: '3', title: 'testTitle3', authors: 'testAut3', genre: 'testGen3'}
            ));
            app.delete('/api/books/1', (req, res) => res.sendStatus(200));
            app.put('/api/books/', (req, res) => res.send(
                {
                    id: '2',
                    title: 'Test update',
                    authors: 'testAut update',
                    genre: 'testGen update',
                    description: 'testDescription update',
                    contentId: 'safasdfasfsdfsdf',
                    coverId: 'sdfsdfgsfgsdsdfsdf',
                    quantity: 5,
                    price: 640
                }
            ));
            app.get('/api/user/testname', (req, res) => res.send(
                {
                    isAvailable: true,
                }
            ));
            app.post('/api/user/', (req, res) => res.send(
                {success: true, message: 'User successfully saved'}
            ));
        }
    },

    module: {
        loaders: [
            {
                test: /\.(js|jsx)$/,
                exclude: /(node_modules|bower_components|build)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env', 'react'],
                        plugins: [
                            require("babel-plugin-transform-class-properties")
                        ]
                    }
                }
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.(png|jpg|woff|woff2|eot|ttf|svg)$/,
                loader: 'url-loader?limit=100000'
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'src/ui/index.html'
        })
    ]
};
