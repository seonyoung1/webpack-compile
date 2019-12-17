const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
	devtool: 'source-map',
	mode: 'development',
	resolve: {
		extensions: ['.js'],
	},
	entry: ['@babel/polyfill', './app/dev-js/app.js', './app/scss/common.scss'],
	output: {
		path: path.resolve(__dirname, 'app'),
		filename: 'js/app.js',
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
				test: /\.scss$/,
				use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
				exclude: /node_modules/,
			},
		],
	},
};
