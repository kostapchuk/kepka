const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { version, name } = require('./package.json');
const { StatsWriterPlugin } = require("webpack-stats-plugin");
const { sentryWebpackPlugin } = require("@sentry/webpack-plugin");
const Dotenv = require('dotenv-webpack');


module.exports = (env, argv) => {
    const isProduction = argv.mode === 'production';
    const isAnalyze = env && env.analyze;

    return {
        entry: './src/index.js',
        output: {
            path: path.resolve(__dirname, 'build'),
            filename: isProduction ? 'static/js/[name].[contenthash:8].js' : 'static/js/[name].js',
            chunkFilename: isProduction ? 'static/js/[name].[contenthash:8].chunk.js' : 'static/js/[name].chunk.js',
            assetModuleFilename: 'static/media/[name].[hash:8][ext]', // Add this line
            publicPath: '/',
        },
        devtool: isProduction ? 'source-map' : 'cheap-module-source-map',
        devServer: {
            historyApiFallback: true,
            hot: true,
            port: 3000,
            static: {
                directory: path.join(__dirname, 'public'), // Ensure public folder is served
            },
        },
        module: {
            rules: [
                {
                    test: /\.(js|jsx)$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env', '@babel/preset-react'],
                            plugins: ['@babel/plugin-transform-runtime']
                        }
                    }
                },
                {
                    test: /\.css$/,
                    use: [
                        isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
                        'css-loader',
                        'postcss-loader'
                    ]
                },
                {
                    test: /\.(png|svg|jpg|jpeg|gif|webp|ico)$/i, // Added webp and ico
                    type: 'asset/resource',
                },
                {
                    test: /\.(woff|woff2|eot|ttf|otf)$/i,
                    type: 'asset/resource',
                }
            ]
        },
        optimization: {
            minimize: isProduction,
            minimizer: [
                new TerserPlugin(),
                new CssMinimizerPlugin(),
            ],
            splitChunks: {
                chunks: 'all',
                name: false,
                cacheGroups: {
                    vendor: {
                        test: /[\\/]node_modules[\\/]/,
                        name(module) {
                            const packageName = module.context && module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)
                                ? module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1]
                                : 'root';

                            if (packageName.includes('@mui') || packageName.includes('@emotion')) {
                                return 'mui';
                            }

                            return `npm.${packageName.replace('@', '')}`;
                        },
                        chunks: 'all',
                    },
                },
            },
            runtimeChunk: 'single',
        },
        plugins: [
            new Dotenv(),
            new webpack.DefinePlugin({
                'APPLICATION_VERSION': JSON.stringify(version),
            }),
            new CleanWebpackPlugin(),
            new HtmlWebpackPlugin({
                template: './public/index.html',
                favicon: './public/favicon.ico',
            }),
            new CopyWebpackPlugin({
                patterns: [
                    {
                        from: 'public',
                        to: '',
                        globOptions: {
                            ignore: ['**/index.html'],
                        },
                    },
                ],
            }),
            isProduction && new MiniCssExtractPlugin({
                filename: 'static/css/[name].[contenthash:8].css',
            }),
            isProduction && new CompressionPlugin(),
            isAnalyze && new BundleAnalyzerPlugin({
                generateStatsFile: true
            }),
            new StatsWriterPlugin({
                filename: '../dist/stats.json',
                stats: {
                    all: false,
                    assets: true,
                    chunks: true,
                    modules: true,
                    entrypoints: true,
                },
            }),
            sentryWebpackPlugin({
                authToken: process.env.SENTRY_AUTH_TOKEN,
                org: 'kepka',
                project: 'javascript-react',
                release: `${name}@${version}`,
                include: './dist',
                ignore: ['node_modules', 'webpack.config.js'],
                urlPrefix: '~/dist',
            }),
        ].filter(Boolean),
        resolve: {
            extensions: ['.js', '.jsx'],
            alias: {
                '@': path.resolve(__dirname, 'src'),
            },
        },
    };
};
