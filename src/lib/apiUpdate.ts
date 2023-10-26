import fs from "fs";
import matter from "gray-matter";
export default async function apiUpdate() {
  const result = "# Дорогая грусть, прости, не вернусь\n";
  let mas = [];
  const files = fs.readdirSync("./src/api");
  for (let el of files) {
    const data = fs.readFileSync("./src/api/" + el, "utf-8");
    const stat = fs.statSync("./src/api/" + el);
    console.log(matter(data));
    mas.push({
      url: "[]()",
    });
  }
  return files;
}
