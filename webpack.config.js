// 'use strict';
var path = require("path");

module.exports = {
  entry: {
    app: ['./test.js'],
  },
  output: {
    path: path.resolve(__dirname, "build"),
    publicPath: "/assets/",
    filename: 'bundle.js',
    library: 'CGE',
    libraryTarget: 'umd',
  },
  devtool: 'source-map',
  module: {
		loaders: [
			{ 
        test: /\.js$/, 
        exclude: /node_modules/, 
        loader: 'babel', 
        query: {
            presets: ['es2015'],
        },
      },
      {
        test: /\.(jpg|png|svg|ttf|eot)$/,
        loader: 'file',
        query: {
            name: 'img/[hash].[ext]',
        },
      },
			{ 
        test: /\.css$/, 
        loader: "style!css" 
      }
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
    extensions:['','.js','.json']
  },
};
