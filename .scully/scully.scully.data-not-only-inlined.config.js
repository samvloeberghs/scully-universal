const {News} = require('./plugins/scully-news');

exports.config = {
  projectRoot: "./apps/scully/src",
  projectName: "scully",
  outDir: './dist/apps/scully-static',
  routes: {
    '/news/:id': {
      type: News,
      url: 'http://localhost:4200/assets/news-100.json',
    },
  }
};
