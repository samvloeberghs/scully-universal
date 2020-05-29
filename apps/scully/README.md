# Project generation

```
# generate playground app
npx nx g app scully --directory=playground
cd apps/scully/src/app
# generate lazy loaded news module route
npx nx g m news --route news --module app.module
# generate overview / detail components + home route
npx nx g c news/overview --module news
npx nx g c news/detail --module news
npx nx g c home
# test prod build and test prod serve
npx nx build scully --prod
npx nx serve scully --prod
# add scully
npx nx add @scullyio/init
# first type of perf test
npx scully --configFile .scully/scully.scully.config.js | npx gnomon
```


