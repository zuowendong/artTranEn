import fs, { createReadStream } from "node:fs";
import { createInterface } from "node:readline";
import { once } from "node:events";
import path from "node:path";

interface Article {
  english: string;
  chinese: string;
}

const inputPath = path.resolve(
  __dirname,
  "../../public/CharlotteWeb/Chapter1.md"
);
const outputPath = path.resolve(__dirname);

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
  const folderName = path.basename(folderPath);

  const outputFolder = `${outputPath}\\${folderName}`;
  if (!fs.existsSync(outputFolder)) {
    fs.mkdir(outputFolder, (err) => {
      if (err) {
        console.error(err);
      } else {
        console.log("mkdir successfully");
      }
    });
  }
  const fileName = path.basename(inputPath, ".md");
  return `${outputFolder}\\${fileName}.json`;
}

function overwriteContent(content: string) {
  const path = generateOutPath();

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
