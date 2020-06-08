// vue.config.js
module.exports = {
  publicPath: "/",
  configureWebpack: {
    module: {
      rules: [
        {
          test: /\.j2/i,
          use: 'raw-loader',
        },
      ],
    },
  },
};
