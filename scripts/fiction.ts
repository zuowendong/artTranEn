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

const sentenceMap = new Map();
let lastLine = "";
function parse(line: string) {
  if (isChinese(line)) {
    sentenceMap.set(line, lastLine);
  } else {
    lastLine = line;
  }
}

(async function () {
  const r = createInterface({
    input: createReadStream(inputPath),
    crlfDelay: Infinity,
  });

  r.on("line", (line) => {
    parse(line);
  });

  r.on("close", () => {
    const list = Array.from(sentenceMap.entries()).map((item) => {
      return {
        chinese: item[0],
        english: item[1],
      };
    });
    overwriteContent(JSON.stringify(list));
  });
})();

function generateOutPath() {
  const folderPath = path.dirname(inputPath);
  const fileName = path.basename(inputPath, ".md");
  return `${folderPath}\\${fileName}.json`;
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

function isChinese(str: string) {
  const reg = /.*[\u4e00-\u9fa5]+.*/;
  return reg.test(str);
}
