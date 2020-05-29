# Running the demo

The following steps can be used to test the Scully and Universal demos.

## Scully

Terminal 1:
```
npx nx serve scully
```

Terminal 2:
```
npx nx build scully --prod
npx scully --scanRoutes --configFile .scully/scully.scully.config.js
```

## Universal

Terminal 1:
```
npx nx serve universal
```

Terminal 2:
```
npm run prerender:universal
npm run minify:universal
```
