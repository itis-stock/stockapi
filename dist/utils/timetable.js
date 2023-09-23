"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const googleapis_1 = require("googleapis");
const subjects_1 = require("../docs/subjects");
const teachers_1 = require("../docs/teachers");
class timetable {
    /**
     * иницилизация таблицы
     */
    constructor() {
        this.sheets_id = '1S-6LVVqPcS52mJs8QYna_NfUtwW7lV-JK_O5ZExBkmQ';
        this.sheets = googleapis_1.google.sheets('v4');
        this.columnCount = 0;
    }
    /**
     * @private
     * получить параметры для получения таблицы
     * @param rangeName название листа, если требуется получить параметры без названия, его можно пропустить
     * @returns параметры
     */
    getParams(rangeName) {
        if (rangeName) {
            return {
                spreadsheetId: this.sheets_id,
                key: process.env.GOOGLE_SHEETS_KEY,
                range: rangeName,
            };
        }
        else {
            return {
                spreadsheetId: this.sheets_id,
                key: process.env.GOOGLE_SHEETS_KEY,
            };
        }
    }
    /**
     * внутри функции получает информацию об объединенных ячейках, а также таблицу, после чего проводит их анализ
     * @returns возвращает таблицу с объединенными ячейками, копируя данные во все объединенные ячейки
     */
    getMergedTable() {
        return __awaiter(this, void 0, void 0, function* () {
            const merges = yield this.getMerges();
            const table = yield this.getTable();
            const tablebuf = [];
            if (merges.columnCount && table) {
                this.columnCount = merges.columnCount;
                for (let i = 0; i < table.length; i++) {
                    const tablerow = [];
                    for (let j = 0; j < merges.columnCount; j++) {
                        if (table[i][j]) {
                            tablerow.push(table[i][j].replace(/\n/g, ' ').replace(/\s+/g, ' ').trim());
                        }
                        else {
                            tablerow.push('');
                        }
                    }
                    tablebuf.push(tablerow);
                }
            }
            merges.merges.forEach((el) => {
                if (typeof el.endColumn === 'number' &&
                    typeof el.startColumn === 'number' &&
                    typeof el.startRow === 'number' &&
                    el.endColumn - el.startColumn > 1) {
                    tablebuf[el.startRow][el.startColumn] += ' объединенный';
                    for (let i = el.startColumn; i < el.endColumn; i++) {
                        tablebuf[el.startRow][i] = tablebuf[el.startRow][el.startColumn];
                    }
                }
            });
            return tablebuf;
        });
    }
    /**
     * получить таблицу
     * @returns возвращает двумерный массив таблицы
     */
    getTable() {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield this.sheets.spreadsheets.values.get(this.getParams('Бакалавриат'));
            const sheet = data.data.values;
            return sheet;
        });
    }
    /**
     * получить информацию об объединенных ячейках
     * @returns возвращает информацию об объединенных ячейках и количество столбцов
     */
    getMerges() {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield this.sheets.spreadsheets.get(this.getParams());
            const sheet = (_a = data.data.sheets) === null || _a === void 0 ? void 0 : _a.find((s) => { var _a; return ((_a = s.properties) === null || _a === void 0 ? void 0 : _a.title) === 'Бакалавриат'; });
            const merges = {
                columnCount: (_c = (_b = sheet === null || sheet === void 0 ? void 0 : sheet.properties) === null || _b === void 0 ? void 0 : _b.gridProperties) === null || _c === void 0 ? void 0 : _c.columnCount,
                merges: [],
            };
            if (sheet === null || sheet === void 0 ? void 0 : sheet.merges) {
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
        });
    }
    /**
     * получить преподавателей определенной группы
     * @returns возвращает массив объектов из названия группы, курса, индекс столбца, практиков и лекторов
     */
    getTeachers() {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const mergedtable = yield this.getMergedTable();
            const teachers = [];
            if (this.columnCount) {
                for (let i = 0; i < this.columnCount; i++) {
                    const group = mergedtable[1][i].match(/11-[0-9]+/g);
                    if (group && !mergedtable[1][i].includes('иностр')) {
                        const course = (_a = mergedtable[0][i]
                            .match(/[1-4] КУРС/g)) === null || _a === void 0 ? void 0 : _a.map((el) => el.replace(' КУРС', ''));
                        teachers.push({
                            group: group.join(''),
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
                        for (let e of subjects_1.subjectslist) {
                            if (element.includes(e)) {
                                for (let u of teachers_1.teacherslist) {
                                    if (element.includes(u + ' ')) {
                                        const buf = {
                                            subject: e,
                                            name: u,
                                        };
                                        if (element.includes('объединенный')) {
                                            if (!teachers[i].lecture.includes(buf)) {
                                                teachers[i].lecture.push(buf);
                                            }
                                        }
                                        else {
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
        });
    }
}
exports.default = timetable;
