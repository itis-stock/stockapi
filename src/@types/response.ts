export type responseType = {
  response: {
    status: number;
    time: number;
    type: 'array' | 'object';
    count?: number; //если type === "array", то count существует и означает количество элементов
    data: any; //сам результат, который берется из firebase
  };
};
