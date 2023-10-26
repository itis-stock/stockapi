import fs from "fs";
import matter from "gray-matter";
export default async function apiUpdate() {
  let result =
    "# Дорогая грусть, прости, не вернусь\n|Order|Name|Changed|Created|\n|---|---|---|---|\n";
  let mas = [];
  const files = fs.readdirSync("./src/api");
  for (let el of files) {
    const data = fs.readFileSync("./src/api/" + el, "utf-8");
    const stat = fs.statSync("./src/api/" + el);
    const mat = matter(data);
    mas.push({
      url:
        "[" +
        mat.data.title +
        "](https://github.com/itis-stock/stockapi/blob/dev-lldan/src/api/" +
        el +
        ")",
      changed: stat.mtime,
      created: stat.birthtime,
      order: mat.data.order,
    });
  }
  mas = mas.sort((a, b) => a.order - b.order);

  for (let el of mas) {
    result +=
      "|" +
      el.order +
      "|" +
      el.url +
      "|" +
      el.changed +
      "|" +
      el.created +
      "|\n";
  }
  fs.writeFileSync("README.md", result);
  return mas;
}
