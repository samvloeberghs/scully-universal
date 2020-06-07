import axios from 'axios';
import { EOL } from 'os';
import { writeFileSync } from 'fs';

const newsDataPath = 'http://localhost:4200/assets/news-100.json';
const routesFile = './apps/universal/routes.txt';

(async () => {

  try {
    const routes = [];

    const newsData = await axios.get(newsDataPath);
    newsData.data.forEach(newsitem => {
      routes.push(`news/${newsitem}`);
    });

    writeFileSync(routesFile, routes.join(EOL), 'utf8');
  } catch (e) {
    console.log(e);
  }
})();
