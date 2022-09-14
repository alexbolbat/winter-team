const path = require('path');

module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? 'winter-team' : '/',

  pages: {
    index: {
      entry: 'src/main.js',
      title: 'Winter films'
    }
  },

  chainWebpack: config => {
    const types = ['vue-modules', 'vue', 'normal-modules', 'normal'];
    types.forEach(type =>
      addStyleResource(config.module.rule('sass').oneOf(type))
    );
  },

  transpileDependencies: ['vuetify'],

  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'scss',
      patterns: []
    }
  }
};

function addStyleResource(rule) {
  rule
    .use('style-resource')
    .loader('style-resources-loader')
    .options({
      patterns: [path.resolve(__dirname, 'src/styles/index.scss')]
    });
}
