// vue.config.js
module.exports = {
  publicPath: "/vnf-designer/",
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
