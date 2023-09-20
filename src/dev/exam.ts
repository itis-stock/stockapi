import fs from 'fs';
import vk from '../utils/vk';
import { stockexams } from '../docs/stockexams';
import { commentType } from '../@types/documents';

export default async function exam() {
  const sueta = new vk();
  const final: commentType[] = [];
  const start = new Date();
  for (let i = 0; i < stockexams.length; i++) {
    const content = await sueta.get('board.getComments', [
      'group_id=169708790',
      `topic_id=${stockexams[i].id}`,
      'need_likes=1',
      'count=100',
    ]);
    if (!content?.response?.items) {
      console.log(stockexams[i].id);
    } else {
      if (content.response.count > 100) {
        console.log(content.response.count);
      }
      for (let j = 0; j < content.response.items.length; j++) {
        if (content.response.items[j].from_id > 0) {
          final.push({
            id: content.response.items[j].id,
            year: 0,
            author_id: content.response.items[j].from_id,
            id_topic: stockexams[i].id,
            course: stockexams[i].course,
            semestr: 0,
            teacher: stockexams[i].teacher,
            subject: stockexams[i].subject,
            date: content.response.items[j].date,
            text: content.response.items[j].text,
            likes: content.response.items[j].likes.count,
            attachments: [],
            special:
              content.response.items[j].from_id === 256014823 ||
              content.response.items[j].from_id === 719164558,
          });
          const dat = new Date(content.response.items[j].date * 1000);
          final[final.length - 1].year = dat.getFullYear();
          if ((dat.getMonth() >= 0 && dat.getMonth() <= 3) || dat.getMonth() >= 10) {
            final[final.length - 1].semestr = 1;
          } else {
            final[final.length - 1].semestr = 2;
          }
          if (content.response.items[j].attachments) {
            for (let h = 0; h < content.response.items[j].attachments.length; h++) {
              if (content.response.items[j].attachments[h].type === 'photo') {
                final[final.length - 1].attachments.push({
                  type: 'photo',
                  photo: content.response.items[j].attachments[h].photo.sizes,
                });
              } else {
                final[final.length - 1].attachments.push({
                  type: 'doc',
                  doc: {
                    title: content.response.items[j].attachments[h].doc.title,
                    size: content.response.items[j].attachments[h].doc.size,
                    ext: content.response.items[j].attachments[h].doc.ext,
                    url: content.response.items[j].attachments[h].doc.url,
                  },
                });
              }
            }
          }
        }
      }
    }
    await new Promise((resolve) => setTimeout(resolve, 500));
  }
  console.log('количество всех сообщений ' + final.length);
  const end = new Date();
  fs.writeFileSync('./src/dev/stockexam.json', JSON.stringify(final));
  console.log((end.getTime() - start.getTime()) / 1000 + ' секунд');
  return final;
}
