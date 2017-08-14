const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require('path');

module.exports = {
	entry: {
		app: path.join(__dirname, 'src/index.js')
	},
	output: {
		path: path.join(__dirname, '/dist'),
		filename: '[name].js',
		publicPath: '/'
	},
	resolve: {
		modules: ["node_modules"],
		extensions: ['.js'],
	},
	module: {
		loaders: [

			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader']
			},
			{
				test: /\.(woff2|woff|ttf|eot|svg)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
				use: [{ loader: 'url-loader', query: { name: '[name]_[hash].[ext]' } }]
			},
		]
	},
	plugins: [
		new HtmlWebpackPlugin({ filename: 'index.html', template: path.join(__dirname, 'src', 'index.html') })
	]
};
