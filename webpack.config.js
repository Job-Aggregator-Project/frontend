let path = require('path');
let ExtractTextPlugin = require("extract-text-webpack-plugin");
let HtmlWebpackPlugin = require("html-webpack-plugin");
let UglifyJsPlugin = require('uglifyjs-webpack-plugin');
let JavaScriptObfuscator = require('webpack-obfuscator');

let config = {
	entry: {
		app: './src/App.js',
	},
	output: {
		path: path.resolve(__dirname, './dist'),
		filename: 'App.js',
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel-loader',
			},
			{
				test: /\.css$/,
				use: ExtractTextPlugin.extract({
					use: "css-loader"
				})
			}
		]
	}
};

let devConfig = {
	devServer: {
		historyApiFallback: {
			index: '/'
		},
		overlay: true,		
		port: 3001
	},
	plugins: [
		new ExtractTextPlugin("style.css"),
		new HtmlWebpackPlugin({
			template: path.resolve(__dirname, './src/index.html'),
			filename: 'index.html'
		})		
	]
};

let prodConfig = {
	plugins: [
		new ExtractTextPlugin("style.css"),
		new HtmlWebpackPlugin({
			template: path.resolve(__dirname, './src/index.html'),
			filename: 'index.html'
		}),
		new UglifyJsPlugin({
			uglifyOptions: {
				output: {
					beautify: false
				},
				compress: {
					inline: false
				}
			}
		}),
		new JavaScriptObfuscator ({
			rotateUnicodeArray: true
		})
	]
};

module.exports = function(env) {
	if (env === 'production'){
		return Object.assign(
			{}, 
			config,
			prodConfig
		)
	}
	if (env === 'development'){
		return Object.assign(
			{},
			config,
			devConfig
		)
	}
}