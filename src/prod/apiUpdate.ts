import fs from 'fs';
import firebase from '../utils/firebase';
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
export default async function apiUpdate(firebase: firebase) {
  try {
    const readme = fs.readFileSync('./README.md', 'utf-8').split('\n');
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
    const count = await firebase.getCount('documentary');
    await firebase.setdoc('documentary', String(count + 1), { data: data });
    return data;
  } catch (err) {
    console.log(err);
  }
}
