const {MinifyHtml} = require('scully-plugin-minify-html');

const {News} = require('./plugins/scully-news');

const postRenderers = [MinifyHtml];

exports.config = {
  inlineStateOnly: true,
  projectRoot: "./apps/scully/src",
  projectName: "scully",
  outDir: './dist/apps/scully-static',
  defaultPostRenderers: postRenderers,
  routes: {
    '/news/:id': {
      type: News,
      url: 'http://localhost:4200/assets/news-100.json',
    },
  }
};
