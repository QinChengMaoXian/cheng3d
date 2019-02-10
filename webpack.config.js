// 'use strict';
var path = require("path");

module.exports = {
  mode: 'development',
  entry: {
    app: ['./test.ts'],
  },
  output: {
    path: path.resolve(__dirname, "build"),
    publicPath: "/build/",
    filename: 'bundle.js',
  },
  devtool: 'source-map',
  module: {
		rules: [
      {
        test: /\.(ts)$/,
        use: 'ts-loader'
      },
      {
        test: /\.(jpg|png|svg|ttf|eot)$/,
        loader: 'file-loader',
        query: {
            name: 'img/[hash].[ext]',
        },
      },
		]
	},
  // devServer: {
  //   hot: true
  // },
  //plugins: [
    // new webpack.DefinePlugin({
    // 'process.env.NODE_ENV': '"development"'
    // }),
    // new webpack.HotModuleReplacementPlugin()
  // ],
  resolve:{
    extensions:['.glsl.ts','.ts','.js','.json']
  },
};
