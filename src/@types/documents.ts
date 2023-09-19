export type commentType = {
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
