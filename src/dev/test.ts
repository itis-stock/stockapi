import vk from '../utils/vk';

export default async function test() {
  const sueta = new vk();
  const final: { id: number; title: string }[] = [];
  const content1 = await sueta.get('board.getTopics', ['group_id=169708790', 'count=100']);
  content1.response.items.forEach((el: any) => {
    if (el.id > 0 && !el.title.includes('экзамен')) {
      final.push({
        id: el.id,
        title: el.title,
      });
    }
  });
  const content2 = await sueta.get('board.getTopics', [
    'group_id=169708790',
    'count=100',
    'offset=100',
  ]);
  content2.response.items.forEach((el: any) => {
    if (el.id > 0 && !el.title.includes('экзамен')) {
      final.push({
        id: el.id,
        title: el.title,
      });
    }
  });
  return final.sort((a, b) => a.title.localeCompare(b.title));
}
