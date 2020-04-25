const webpack = require('webpack');
const merge = require('webpack-merge');

const { common, mainChunk, } = require('./webpack.common.js');
const port = process.env.PORT || 3500;
const host = `http://localhost:${port}`;


module.exports = merge(common, {
	mode: 'development',
	entry: {
		[mainChunk]: [
			'webpack-hot-middleware/client?reload=true',
			`./frontend/apps/main/js/index.jsx`
		]
	},
	output: {
		filename: "[name]/[hash].js",
		publicPath: `${host}/`
	},

	plugins: [
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify('development'),
		}),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NamedModulesPlugin(),
		// new require('webpack-bundle-analyzer').BundleAnalyzerPlugin({
		// 	openAnalyzer: false,
		// 	analyzerMode: "static",
		// 	reportFilename: require("path").resolve("bundleanalyze/index.html")
		// })
	],

	devtool: 'inline-source-map'
});