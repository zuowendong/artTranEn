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

const article_arr: Article[] = [];
(async function () {
  const r = createInterface({
    input: createReadStream(inputPath),
    crlfDelay: Infinity,
  });

  r.on("line", (line) => {
    const data = parse(article_arr, line);
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
      console.log("Content written successfully.");
    }
  });
}

function parse(result: any, lineData: string) {
  result.push(lineData);
  return result.map((item: any) => {
    return {
      english: item,
      chinese: "xxxxxxxxx",
    };
  });
}

export const list = [
  {
    a: 123,
  },
];
