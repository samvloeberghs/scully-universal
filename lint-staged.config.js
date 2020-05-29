module.exports = {
  'src/**/*.{ts,js,json,html,scss,css,sass}': [
    'npm run affected:lint --fix',
    'npm run format'
  ]
};
