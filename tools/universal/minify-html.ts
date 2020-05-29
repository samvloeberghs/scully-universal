import { readFileSync, writeFileSync } from 'fs';
import { Options, minify } from 'html-minifier';

const [
  ...htmlFilePaths
] = process.argv.slice(2);

const htmlMinifierOptions: Options = {
  caseSensitive: true,
  removeComments: true,
  collapseWhitespace: true,
  collapseBooleanAttributes: true,
  removeRedundantAttributes: true,
  useShortDoctype: true,
  removeEmptyAttributes: true,
  minifyCSS: true,
  minifyJS: true,
  removeScriptTypeAttributes: true,
  removeStyleLinkTypeAttributes: true,
  // don't remove attribute quotes, not all social media platforms can parse this over-optimization
  removeAttributeQuotes: false,
  // don't remove optional tags, like the head, not all social media platforms can parse this over-optimization
  removeOptionalTags: false
};

console.log('htmlFilePaths', htmlFilePaths);

htmlFilePaths.forEach(htmlFilePath => {
  try {
    const htmlFileContent = readFileSync(htmlFilePath).toString();
    const minifiedHtmlFileContent = minify(htmlFileContent, htmlMinifierOptions);
    writeFileSync(htmlFilePath, minifiedHtmlFileContent);
  } catch (e) {
    console.error(`Error minifying ${htmlFilePath}`, e);
  }
});
