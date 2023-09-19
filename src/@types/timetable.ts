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
  group: number;
  course: number;
  indexColumn: number;
  lecture: teachersElementType[];
  practice: teachersElementType[];
};

export type teachersElementType = {
  subject: string;
  name: string;
};
