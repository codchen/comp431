var path = require('path')
var babelrc = JSON.parse(require('fs').readFileSync('.babelrc').toString())
var pkg = require('./package.json')

var webpack = require('webpack')

module.exports = {
    entry: pkg.main,
    output: { path: path.resolve(__dirname, 'dist'), filename: 'bundle.js' },
    devtool: 'source-map',
    stats: { colors: true },
    node: { fs: 'empty'},
    module: {
        rules: [{
            test: /\.jsx?$/,
            loader: 'babel-loader',
            include: [path.resolve(__dirname, 'src'),
                        path.resolve(__dirname, 'tests')],
            options: babelrc
        }, {
            test: /\.json$/,
            loader: 'json-loader'
        }, {
          test: /\.css$/,
          loader: 'style-loader!css-loader?sourceMap'
        }, {
          test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
          loader: "url-loader?limit=10000&mimetype=application/font-woff"
        }, {
          test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
          loader: "url-loader?limit=10000&mimetype=application/font-woff"
        }, {
          test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
          loader: "url-loader?limit=10000&mimetype=application/octet-stream"
        }, {
          test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
          loader: "file-loader"
        }, {
          test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
          loader: "url-loader?limit=10000&mimetype=image/svg+xml"
        }, {
          test: /\.(jpe?g|png|gif|svg)$/i,
          loaders: "file-loader"
        }]
    }
}
