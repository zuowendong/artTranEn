import fs, { createReadStream } from "node:fs";
import { createInterface } from "node:readline";
import { once } from "node:events";
import path, { dirname } from "node:path";
import { fileURLToPath } from "node:url";

interface Article {
  english: string;
  chinese: string;
}
const __dirname = dirname(fileURLToPath(import.meta.url));
const inputPath = path.resolve(__dirname, "../public/CharlotteWeb/Chapter1.md");

(async function () {
  const r = createInterface({
    input: createReadStream(inputPath),
    crlfDelay: Infinity,
  });

  r.on("line", (line) => {
    const data = parse(line);
    overwriteContent(JSON.stringify(data));
  });

  await once(r, "close");
})();

function generateOutPath() {
  const folderPath = path.dirname(inputPath);
  const fileName = path.basename(inputPath, ".md");
  return `${folderPath}\\${fileName}.json`;
}

function overwriteContent(content: string) {
  const path = generateOutPath();
  console.log(111, path);

  fs.writeFile(path, content, (err: any) => {
    if (err) {
      console.error("Error write file content:", err);
    } else {
      // console.log("Content written successfully.");
    }
  });
}

const zhMap = new Map();

const article_arr: any = [];
const zhArr: any = [];

function parse(lineData: string) {
  if (isChinese(lineData)) {
    zhArr.push(lineData);
  } else {
    article_arr.push(lineData);
  }

  zhArr.forEach((item: string, index: number) => {
    zhMap.set(index, item);
  });

  console.log(111, zhMap);
  console.log(222, article_arr);
  return article_arr.map((item: any, index: number) => {
    return {
      english: item,
      chinese: zhMap.get(index),
    };
  });
}

function isChinese(str: string) {
  const reg = /.*[\u4e00-\u9fa5]+.*/;
  return reg.test(str);
}
