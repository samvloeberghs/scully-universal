import axios from 'axios';
import { EOL } from 'os';
import { writeFileSync } from 'fs';

const newsDataPath = 'http://localhost:4200/assets/news-100.json';
const routesFile = './apps/universal/routes.txt';

axios.get(newsDataPath).then(res => {
  const routes = [];
  res.data.forEach(newsitem => {
    routes.push('news/' + newsitem);
  });
  writeFileSync(routesFile, routes.join(EOL), 'utf8');
}).catch(e => console.log(e));
