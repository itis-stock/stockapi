import axios from 'axios';

export default class vk {
  url: string;
  /**
   * иницилизируем
   */
  constructor() {
    this.url = 'https://api.vk.com/method/';
  }
  /**
   * делает запрос в апи вк
   * @param method название метода
   * @param params массив параметров
   * @returns возвращает контент
   */
  async get(method: string, params: string[]) {
    const data = await axios.get(this.url + method + '?' + params.join('&') + '&v=5.131', {
      headers: {
        Authorization: 'Bearer ' + process.env.VK_API_KEY,
      },
    });
    return data.data;
  }
}
