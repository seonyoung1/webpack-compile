const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
	devtool: 'source-map',
	mode: 'development',
	resolve: {
		extensions: ['.js'],
	},
	entry: {
		app: ['@babel/polyfill', './app/dev-js/app.js'],
		styles: ['./app/scss/common.scss']
	},
	output: {
		path: path.resolve(__dirname, 'app'),
		filename: 'js/[name].js',
		publicPath: '/app',
	},
	plugins: [
	    new MiniCssExtractPlugin({ filename: 'css/common.css' })
    ],
	module: {
		rules: [
			{
				test: /\.js$/,
				include: [path.resolve(__dirname, 'app/dev-js')],
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env'],
						plugins: ['@babel/plugin-proposal-class-properties'],
					},
				},
			},
			{
				test: /\.(sa|sc|c)ss$/,
				use: [
					MiniCssExtractPlugin.loader,
					{
						loader: 'css-loader',
						options: {
							sourceMap: true,
						},
					},
					{
						loader: 'sass-loader',
						options: {
							sourceMap: true,
						},
					},
				],
				exclude: /node_modules/,
			},
			{
				test: /\.(ico|png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
				loader: 'file-loader',
				options: {
					publicPath: '../images/',
					name: '[name].[ext]',
				}
			}
		],
	},
};
