'use strict';
const webpack = require('webpack');
module.exports = {
  entry: './test.js',
  output: {
    	path: './dist',
    	filename: 'root.bundle.js',
  },
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
  resolve:{
    extensions:['','.js','.json']
  },
};
