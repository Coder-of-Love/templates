const path = require("path");
const webpack = require("webpack");
const merge = require('webpack-merge');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const mainChunk = 'main';

const IS_MAIN = process.env.MAIN === 'true';

const title = process.env.NODE_ENV === 'development' ? 'DEV React-redux-app' : 'React-redux-app';
const HtmlWebpackPluginOptions = (chunk, obj = {}) => {
	const { filename } = (() => {
		switch(chunk) {
			case mainChunk:
				return { filename: 'main.ejs', title };
		}
	})();

	return Object.assign({
		template: path.resolve('frontend', 'templates', filename),
		inlineSource: 'runtime~.+\\.js',
		title,
		//favicon: './frontend/apps/common/images/favicon.png',
		chunks: [chunk, 'vendor', `common`],
		filename: `${chunk}/index.html`
	}, obj);
};

const output = {
	path: path.resolve('./dist')
};

module.exports.output = output;
module.exports.mainChunk = mainChunk;
module.exports.common = merge(
	require('./webpack.aliases'),
	{
		context: __dirname,

		output,

		plugins: [
			new ExtractTextPlugin({
				filename: '[name]/style-[chunkhash:6].css',
				allChunks: true
			}),
			...(IS_MAIN ? [new HtmlWebpackPlugin(HtmlWebpackPluginOptions(mainChunk))] : []),
			new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
		],

		module: {
			rules: [
				{
					test: /\.jsx?/,
					exclude: [/node_modules/],
					use: 'babel-loader'
				},
				{
					test: /\.css/,
					use: ExtractTextPlugin.extract({
						use: "css-loader",
						fallback: "style-loader"
					})
				},
				{
					test: /\.scss/,
					use: ExtractTextPlugin.extract({
						fallback: "style-loader",
						use: [
							{
								loader: 'css-loader',
								// https://develoger.com/how-to-obfuscate-css-class-names-with-react-and-webpack-20e2b5c49cda
								// options: {
								// 	modules: true,
								// 	importLoaders: 1,
								// 	localIdentName: '[sha1:hash:hex:3]'
								// }
							},
							{
								loader: "sass-loader",
								options: {
									includePaths: [path.resolve("frontend", "fonts")]
								}
							}]
					})
				},
				{
					test: /\.(html|xlsx?)$/,
					use: [{
						loader: 'file-loader',
						options: {
							name: '[name].[ext]',
							outputPath: 'public',
						}
					}],
				},
				{
					test: /\.(jade|pug)/,
					use: [
						{
							loader: 'jade-loader',
							options: {
								outputPath: '/',
								name: '[name]/index.[ext]'
							}
						}
					]
				},
				{
					test: /\.ejs$/,
					loader: 'ejs-loader',
				},
				{
					test: /\.(png|jpg|jpeg|gif|svg)$/,
					use: [
						{
							loader: 'url-loader',
							options: {
								limit: 8192,
								fallback: 'file-loader',
								outputPath: 'images',
								name: '[name].[ext]'
							}
						}
					]
				},
				{
					test: /\.(eot|ttf|woff|woff2)$/,
					use: [
						{
							loader: 'file-loader',
							options: {
								outputPath: 'fonts'
							}
						}
					]
				}
			]
		}
	}
);