import fs from 'fs';
import path from 'path';
import { responseType } from '../@types/response';
type apiType = {
  title: string;
  content: apiContentType[];
};
type apiContentType = {
  type: 'text' | 'subtitle' | 'subsubtitle';
  item: string | apiContentItemType[];
};
type apiContentItemType = {
  text: string;
  highlight: boolean;
};
export default async function apiGet() {
  const responseObject: responseType = {
    response: {
      status: 200,
      time: 0,
      type: 'object',
      data: null,
    },
  };
  const start = new Date();
  try {
    const readmePath = path.join(__dirname, '../../README.md');
    const readme = fs.readFileSync(readmePath, 'utf-8').split('\n');
    const data: apiType[] = [];
    for (let i = 0; i < readme.length; i++) {
      if (readme[i]) {
        if (readme[i].includes('###')) {
          data[data.length - 1].content.push({
            type: 'subsubtitle',
            item: readme[i].replace('###', '').trim(),
          });
        } else if (readme[i].includes('##')) {
          data[data.length - 1].content.push({
            type: 'subtitle',
            item: readme[i].replace('##', '').trim(),
          });
        } else if (readme[i].includes('#')) {
          data.push({
            title: readme[i].replace('#', '').trim(),
            content: [],
          });
        } else {
          const item = readme[i].split('`');
          const itemBuffer: apiContentItemType[] = [];
          for (let j = 0; j < item.length; j++) {
            if (j % 2 === 0) {
              if (item[j]) {
                itemBuffer.push({
                  text: item[j],
                  highlight: false,
                });
              }
            } else {
              if (item[j]) {
                itemBuffer.push({
                  text: item[j],
                  highlight: true,
                });
              }
            }
          }
          data[data.length - 1].content.push({
            type: 'text',
            item: itemBuffer,
          });
        }
      }
    }
    responseObject.response.data = data;
    const end = new Date();
    responseObject.response.time = (end.getTime() - start.getTime()) / 1000;
    return responseObject;
  } catch (err) {
    console.log(err);
    responseObject.response.status = 33;
    responseObject.response.type = 'error';
    responseObject.response.errormessage = 'ошибка при чтении README.md';
    return responseObject;
  }
}
