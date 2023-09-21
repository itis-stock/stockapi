export type commentType = {
  id: number;
  year: number;
  author_id: number;
  id_topic: number;
  course: number;
  semestr: number;
  teacher: string;
  subject: string;
  date: number;
  text: string;
  likes: number;
  attachments: attachmentsType[];
  special: boolean;
};

export type attachmentsType = {
  type: 'photo' | 'doc';
  photo?: photoType;
  doc?: docType;
};

export type photoType = {
  height: number;
  width: number;
  type: 's' | 'm' | 'x' | 'o' | 'p' | 'q' | 'r' | 'y' | 'z' | 'w';
  url: string;
};

export type docType = {
  title: string;
  /**
   * размер в байтах
   */
  size: number;
  ext: string;
  url: string;
};

export type documentType = {
  url: string;
  year: number;
  author_id: number;
  course: number | null;
  semestr: number | null;
  teacher: string | null;
  subject: string | null;
  date: number;
  title: string | null;
  likes: number;
  special: boolean;
};
