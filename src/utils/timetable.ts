import { google, sheets_v4 } from 'googleapis';
import { mergesType, tableType, teachersElementType, teachersType } from '../@types/timetable';
import { subjectslist } from '../docs/subjects';
import { teacherslist } from '../docs/teachers';

export default class timetable {
  sheets_id = '1S-6LVVqPcS52mJs8QYna_NfUtwW7lV-JK_O5ZExBkmQ';
  sheets: sheets_v4.Sheets;
  columnCount: number;

  constructor() {
    this.sheets = google.sheets('v4');
    this.columnCount = 0;
  }

  private getParams(rangeName?: string) {
    if (rangeName) {
      return {
        spreadsheetId: this.sheets_id,
        key: process.env.GOOGLE_SHEETS_KEY,
        range: rangeName,
      };
    } else {
      return {
        spreadsheetId: this.sheets_id,
        key: process.env.GOOGLE_SHEETS_KEY,
      };
    }
  }

  private async getMergedTable() {
    const merges = await this.getMerges();
    const table = await this.getTable();
    const tablebuf: tableType = [];
    if (merges.columnCount && table) {
      this.columnCount = merges.columnCount;
      for (let i = 0; i < table.length; i++) {
        const tablerow: string[] = [];
        for (let j = 0; j < merges.columnCount; j++) {
          if (table[i][j]) {
            tablerow.push(table[i][j].replace(/\n/g, ' ').replace(/\s+/g, ' ').trim());
          } else {
            tablerow.push('');
          }
        }
        tablebuf.push(tablerow);
      }
    }
    merges.merges.forEach((el) => {
      if (
        typeof el.endColumn === 'number' &&
        typeof el.startColumn === 'number' &&
        typeof el.startRow === 'number' &&
        el.endColumn - el.startColumn > 1
      ) {
        tablebuf[el.startRow][el.startColumn] += ' объединенный';
        for (let i = el.startColumn; i < el.endColumn; i++) {
          tablebuf[el.startRow][i] = tablebuf[el.startRow][el.startColumn];
        }
      }
    });
    return tablebuf;
  }

  private async getTable(): Promise<tableType> {
    const data = await this.sheets.spreadsheets.values.get(this.getParams('Бакалавриат'));
    const sheet = data.data.values;
    return sheet;
  }

  private async getMerges(): Promise<mergesType> {
    const data = await this.sheets.spreadsheets.get(this.getParams());
    const sheet = data.data.sheets?.find((s) => s.properties?.title === 'Бакалавриат');
    const merges: mergesType = {
      columnCount: sheet?.properties?.gridProperties?.columnCount,
      merges: [],
    };
    if (sheet?.merges) {
      for (let i = 0; i < sheet.merges.length; i++) {
        merges.merges.push({
          startRow: sheet.merges[i].startRowIndex,
          endRow: sheet.merges[i].endRowIndex,
          startColumn: sheet.merges[i].startColumnIndex,
          endColumn: sheet.merges[i].endColumnIndex,
        });
      }
    }
    return merges;
  }

  async getTeachers() {
    const mergedtable = await this.getMergedTable();
    const teachers: teachersType[] = [];

    if (this.columnCount) {
      for (let i = 0; i < this.columnCount; i++) {
        const group = mergedtable[1][i].match(/11-[0-9]+/g)?.map((el) => el.replace('-', ''));
        if (group && !mergedtable[1][i].includes('иностр')) {
          const course = mergedtable[0][i]
            .match(/[1-4] КУРС/g)
            ?.map((el) => el.replace(' КУРС', ''));
          teachers.push({
            group: Number(group),
            course: Number(course),
            indexColumn: i,
            practice: [],
            lecture: [],
          });
        }
      }
    }
    for (let i = 0; i < teachers.length; i++) {
      for (let j = 0; j < mergedtable.length; j++) {
        const element = mergedtable[j][teachers[i].indexColumn];
        if (element) {
          for (let e of subjectslist) {
            if (element.includes(e)) {
              for (let u of teacherslist) {
                if (element.includes(u + ' ')) {
                  const buf: teachersElementType = {
                    subject: e,
                    name: u,
                  };
                  if (element.includes('объединенный')) {
                    if (!teachers[i].lecture.includes(buf)) {
                      teachers[i].lecture.push(buf);
                    }
                  } else {
                    let flag = true;
                    for (let h of teachers[i].practice) {
                      if (h.name === buf.name && h.subject === buf.subject) {
                        flag = false;
                      }
                    }
                    if (flag) {
                      teachers[i].practice.push(buf);
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
    return teachers;
  }
}
