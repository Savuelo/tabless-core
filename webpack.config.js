const path = require('path');

module.exports = {
  mode: 'production',
  entry: './src/index.ts',
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      }
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    filename: 'tabless.js',
    path: path.resolve(__dirname, 'bundle'),
    libraryTarget: "var",
    library: "Tabless",
    libraryExport: 'default'
  }
}