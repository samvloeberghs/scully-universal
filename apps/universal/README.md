# Project generation

```
# generate playground app
npx nx g app universal --directory=playground
cd apps/universal/src/app
# generate lazy loaded news module route
npx nx g m news --route news --module app.module
# generate overview / detail components + home route
npx nx g c news/overview --module news
npx nx g c news/detail --module news
npx nx g c home
# test prod build and test prod serve
npx nx build universal --prod
npx nx serve universal --prod
# add universal ( change default project in angular.json )
npx nx add @nguniversal/express-engine 
# first type of perf test
npm run prerender:playground:universal | npx gnomon
```
