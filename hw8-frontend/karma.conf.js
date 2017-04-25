let path = require('path')

let webpackConfig = require('./webpack.config.js')
webpackConfig.devtool = 'inline-source-map'

if (!webpackConfig.module.rules) webpackConfig.module.rules = []
webpackConfig.module.rules.push({
    test: /\.jsx?$/,
    include: [path.resolve(__dirname, 'src')],
    exclude: [path.resolve(__dirname, 'node_modules'),
                path.resolve(__dirname, 'src/utils'),
                path.resolve(__dirname, 'src/components/common')],
    enforce: 'post',
    loader: 'istanbul-instrumenter-loader',
    options: {
        cacheDirectory: true,
        esModules: true
    }
})

webpackConfig.resolve = {
    alias: {
        'isomorphic-fetch': 'mock-fetch',
    }
}
webpackConfig.externals = {
    'jsdom': 'window',
    'mockery': 'window',
}

module.exports = function(config) {
  config.set({

    basePath: '',

    frameworks: ['mocha'],

    files: [
      'tests/*.spec.js',
      'tests/*/*.spec.js'
    ],

    exclude: [
    ],

    plugins: [
        'karma-chrome-launcher',
        'karma-coverage-istanbul-reporter',
        'karma-junit-reporter',
        'karma-mocha',
        'karma-sourcemap-loader',
        'karma-webpack'
    ],

    preprocessors: {
        'tests/*.js': ['webpack', 'sourcemap'],
        'tests/*/*.spec.js': ['webpack', 'sourcemap']
    },

    webpack: webpackConfig,
    webpackMiddleware: { noInfo: true },

    coverageIstanbulReporter: {
        reports: ['html', 'lcovonly', 'text-summary'],
        dir: './coverage',
        fixWebpackSourcePaths: true,
        'report-config': {
            html: {
                subdir: 'html'
            }
        }
    },
    
    junitReporter: {
        outputDir: 'junit'
    },

    reporters: ['progress', 'coverage-istanbul', 'junit'],

    port: 9876,

    colors: true,

    logLevel: config.LOG_INFO,

    autoWatch: true,

    browsers: ['Chrome'],

    singleRun: false,

    concurrency: Infinity
  })
}
