export type commentType = {
  year: number;
  author_id: number;
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
  photo?: photoType[];
  doc?: docType;
};

export type photoType = {
  height: number;
  width: number;
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

export type userType = {
  id_vk: number;
  name_vk: string;
  telegram_nickname: string;
  hidden: boolean;
  display_name: string;
  description: string;
  photo_url: string;
  group: string;
  noise: boolean;
};
