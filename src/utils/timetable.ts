import { google, sheets_v4 } from 'googleapis';
import { mergesType, tableType } from '../@types/timetable';

export default class timetable {
  sheets_id = '1S-6LVVqPcS52mJs8QYna_NfUtwW7lV-JK_O5ZExBkmQ';
  sheets: sheets_v4.Sheets;
  constructor() {
    this.sheets = google.sheets('v4');
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
    return mergedtable;
  }
}
