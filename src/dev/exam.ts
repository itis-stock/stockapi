import axios from 'axios';

export default async function exam() {
  let topics: { id: number; title: string }[] = [];
  const data1 = await axios.get(
    'https://api.vk.com/method/board.getTopics?count=100&group_id=169708790&v=5.131',
    {
      headers: {
        Authorization:
          'Bearer vk1.a.yixLwrwGPewYuVmDHg7ub2ME3wP6GLwx2jRMv9EoXTvcpL0h5ENz7_-1WZAj1dqhfVcIqimfvD3liShR2IDmDZP6wcn0OGeUNRptjmAwE55r5XT_xVBrf3xVlN45eSeBdzJcdPcx3I8OczLCm8aid74vt2_no7QGtNmQ6OGSfgOeOVnqjZYtAAaTIyTIloZRh07KHAuZpzpJhD-BN58e9g',
      },
    },
  );
  for (let i = 0; i < data1.data.response.items.length; i++) {
    topics.push({
      id: data1.data.response.items[i].id,
      title: data1.data.response.items[i].title,
    });
  }
  const data2 = await axios.get(
    'https://api.vk.com/method/board.getTopics?offset=100&count=100&group_id=169708790&v=5.131',
    {
      headers: {
        Authorization:
          'Bearer vk1.a.yixLwrwGPewYuVmDHg7ub2ME3wP6GLwx2jRMv9EoXTvcpL0h5ENz7_-1WZAj1dqhfVcIqimfvD3liShR2IDmDZP6wcn0OGeUNRptjmAwE55r5XT_xVBrf3xVlN45eSeBdzJcdPcx3I8OczLCm8aid74vt2_no7QGtNmQ6OGSfgOeOVnqjZYtAAaTIyTIloZRh07KHAuZpzpJhD-BN58e9g',
      },
    },
  );
  for (let i = 0; i < data2.data.response.items.length; i++) {
    topics.push({
      id: data2.data.response.items[i].id,
      title: data2.data.response.items[i].title,
    });
  }
  topics = topics.filter((el) => {
    if (el.title.includes('экзамен')) {
      return el;
    }
  });
  return topics;
}
