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
  type: "photo" | "doc";
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
  id: number;
  telegram_nickname: string;
  display_name: string | null;
  description: string | null;
  photo_url: string | null;
  group: string;
};
