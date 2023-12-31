export type mergesType = {
  columnCount: number | null | undefined;
  merges: mergesElementType[];
};

export type mergesElementType = {
  startRow: number | null | undefined;
  endRow: number | null | undefined;
  startColumn: number | null | undefined;
  endColumn: number | null | undefined;
};

export type tableType = string[][] | null | undefined;

export type teachersType = {
  group: string;
  course: number;
  /**
   * исключительно для парсинга таблицы, не важно для работы остальных функций
   */
  indexColumn: number;
  lecture: teachersElementType[];
  practice: teachersElementType[];
};

export type teachersElementType = {
  subject: string;
  name: string;
};
