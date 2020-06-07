const { setPluginConfig } = require('@scullyio/scully');
const { MinifyHtml } = require('scully-plugin-minify-html');
const { DisableAngular } = require('scully-plugin-disable-angular');

const { News } = require('./plugins/scully-news');
const { Users } = require('./plugins/scully-users');

setPluginConfig(DisableAngular, {
  // removeState: true
});

setPluginConfig(MinifyHtml, {});

const postRenderers = []; //[DisableAngular, MinifyHtml];

exports.config = {
  // inlineStateOnly: true,
  projectRoot: './apps/scully/src',
  projectName: 'scully',
  outDir: './dist/apps/scully-static',
  defaultPostRenderers: postRenderers,
  routes: {
    '/news/:id': {
      type: News,
      url: 'http://localhost:4200/assets/news-100.json'
    },
  }
};
