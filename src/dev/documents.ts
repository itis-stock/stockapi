import { documentType } from '../@types/documents';
import { stockdocuments } from '../docs/stockdocuments';

export default async function documents() {
  const metel: documentType[] = [];

  for (let i = 0; i < stockdocuments.length; i++) {
    const dat = new Date();
    metel.push({
      url: stockdocuments[i].url,
      id: i + 1,
      year: stockdocuments[i].year,
      author_id: 0,
      course: stockdocuments[i].course,
      semestr: stockdocuments[i].semestr,
      teacher: stockdocuments[i].teacher,
      subject: stockdocuments[i].subject,
      date: Math.floor(dat.getTime() / 1000),
      title: stockdocuments[i].title,
      likes: 0,
      special: stockdocuments[i].special,
    });
  }
  return metel;
}
