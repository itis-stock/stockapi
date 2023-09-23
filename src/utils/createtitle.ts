/**
 * получить название на основе курса, семестра, предмета и преподавателя
 * @param course number курс
 * @param semestr number семестр
 * @param subject string предмет
 * @param teacher string преподаватель
 * @returns возвращает короткое название
 */
export default function createtitle(
  course: number,
  semestr: number,
  subject: string,
  teacher: string,
) {
  return course + '-' + semestr + '-' + subject + '-' + teacher;
}
