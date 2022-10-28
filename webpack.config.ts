import path from "path";
import { Configuration } from "webpack";
import MiniCssExtractPlugin from "mini-css-extract-plugin";

const config: Configuration = {
  entry: "./src/index.tsx",
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              "@babel/preset-env",
              "@babel/preset-react",
              "@babel/preset-typescript",
            ],
          },
        },
      },
      {
        test: /\.css$/,
        use: [
          "style-loader",
          //MiniCssExtractPlugin.loader, // instead of style-loader
          'css-loader'
        ]
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]?[hash]'
        }
      }
    ],
  },
  plugins: [
    new MiniCssExtractPlugin(),
  ],
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  output: {
    path: path.resolve(__dirname, "./public"),
    filename: "bundle.js",
    publicPath: '/public/',
  },
  //@ts-ignore
  devServer: {
    static: path.join(__dirname, "./public"),
    compress: true,
    port: 4000,
  },
};

export default config;