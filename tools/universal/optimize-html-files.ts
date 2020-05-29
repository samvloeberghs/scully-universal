import * as glob from 'glob';
import * as os from 'os';
import { exec } from 'child_process';

const [
  searchPath
] = process.argv.slice(2);

function shardArray<T>(items: T[], maxNoOfShards = (os.cpus().length - 1) || 1): T[][] {
  const shardedArray = [];
  const numShards = Math.min(maxNoOfShards, items.length);
  for (let i = 0; i < numShards; i++) {
    shardedArray.push(
      items.filter((_, index) => index % numShards === i)
    );
  }

  return shardedArray;
}

const getDirectories = (src, callback) => {
  glob(src + '/**/index.html', callback);
};
getDirectories(searchPath, async (err, res) => {
  if (err) {
    console.error('Error', err);
    process.exit(1);
  } else {
    const shardedFiles = shardArray<string>(res);
    const childProcesses = shardedFiles.map(files =>
      new Promise((resolve, reject) => {
        exec(
          `ts-node -P ./tools/tsconfig.tools.json ./tools/universal/minify-html.ts ${files.join(' ')}`
          , (error, stdout, stderr) => {
            if (error) {
              console.error(`exec error: ${error}`);
              reject();
              if (stdout) {
                console.log(`stdout: ${stdout}`);
              }
              if (stderr) {
                console.error(`stderr: ${stderr}`);
              }
              return;
            }
            resolve();
          });
      })
    );
    await Promise.all(childProcesses);
  }
});
