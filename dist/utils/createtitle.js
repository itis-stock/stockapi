"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * получить название на основе курса, семестра, предмета и преподавателя
 * @param course number курс
 * @param semestr number семестр
 * @param subject string предмет
 * @param teacher string преподаватель
 * @returns возвращает короткое название
 */
function createtitle(course, semestr, subject, teacher) {
    return course + '-' + semestr + '-' + subject + '-' + teacher;
}
exports.default = createtitle;
