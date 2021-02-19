const fs = require('fs')
const path = require('path')
const webpack = require('webpack')
const hash = require('hash-sum')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')
const svgToMiniDataURI = require('mini-svg-data-uri')

const resolve = (dir = '') => {
  return path.resolve(__dirname, '../', dir)
}

module.exports = (env = {}, { mode }) => {
  const isProd = mode === 'production'

  return {
    mode,

    context: resolve(),

    entry: resolve('src/index.ts'),

    devtool: isProd ? false : 'eval-cheap-source-map',
  
    output: {
      filename: 'tvst.umd.js',
      libraryTarget: 'umd',
      path: resolve('dist'),
      umdNamedDefine: true,
    },

    resolve: {
      extensions: ['.ts', '.tsx', '.vue', '.js'],
      alias: {
        '@': resolve('src')
      }
    },
  
    module: {
      rules: [
        {
          test: /\.vue$/,
          exclude: /(node_modules)/,
          loader: 'vue-loader',
          options: {
            loaders: {
              ts: 'ts-loader',
              tsx: 'babel-loader!ts-loader',
            },
            extractCSS: false
          }
        },
  
        {
          test: /\.tsx$/,
          exclude: /(node_modules)/,
          use: [
            {
              loader: 'cache-loader',
              options: {
                cacheIdentifier: hash(
                  fs.readFileSync(resolve('package.json'))
                  + JSON.stringify(env)
                ),
                cacheDirectory: resolve('.cache')
              }
            },
            'babel-loader',
            {
              loader: 'ts-loader',
              options: {
                appendTsxSuffixTo: [/\.vue$/]
              }
            }
          ]
        },
  
        {
          test: /\.ts$/,
          exclude: /(node_modules)/,
          use: [
            {
              loader: 'cache-loader',
              options: {
                cacheIdentifier: hash(
                  fs.readFileSync(resolve('package.json'))
                  + JSON.stringify(env)
                ),
                cacheDirectory: resolve('.cache')
              }
            },
            {
              loader: 'ts-loader',
              options: {
                appendTsSuffixTo: [/\.vue$/]
              }
            }
          ]
        },
  
        {
          test: /\.css$/,
          use: [
            'vue-style-loader',
            'css-loader',
            'postcss-loader'
          ]
        },
  
        {
          test: /\.s[ac]ss$/,
          use: [
            'vue-style-loader',
            'css-loader',
            'sass-loader',
            'postcss-loader'
          ]
        },
  
        {
          test: /\.(png|jpe?g|gif)(\?.*)?$/,
          loader: 'file-loader'
        },
  
        {
          test: /\.(svg)(\?.*)?$/,
          loader: 'url-loader',
          options: {
            limit: 4096,
            esModule: false,
            generator: content => svgToMiniDataURI(content.toString())
          }
        },
        
        {
          test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
          loader: 'url-loader'
        }
      ]
    },
  
    optimization: {
      minimize: isProd,
      minimizer: [
        new TerserPlugin({
          extractComments: isProd,
          terserOptions: {
            output: {
              comments: isProd,
            },
            compress: {
              drop_console: isProd
            }
          },
        }),
      ],
    },

    externals: [
      {
        vue: {
          root: 'Vue',
          commonjs: 'vue',
          commonjs2: 'vue',
        }
      }
    ],
    
    plugins: [
      new CleanWebpackPlugin(),
      new VueLoaderPlugin,
      new webpack.optimize.LimitChunkCountPlugin({
        maxChunks: 1
      })
    ]
  }  
}
