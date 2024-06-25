import path from "node:path";
import fs, { createReadStream } from "node:fs";
import { createInterface } from "node:readline";
import { parse } from "./parse";

function getOutPath(inputPath: string) {
  const folderPath = path.dirname(inputPath);
  const fileName = path.basename(inputPath, ".md");
  return `${folderPath}\\${fileName}.json`;
}

function writeFiction(content: string, inputPath: string) {
  const path = getOutPath(inputPath);
  fs.writeFile(path, content, (err: any) => {});
}

export function readFiction(
  inputPath: string,
  sentenceMap: Map<string, string>
) {
  const r = createInterface({
    input: createReadStream(inputPath),
    crlfDelay: Infinity,
  });

  r.on("line", (line) => {
    parse(line, sentenceMap);
  });

  r.on("close", () => {
    const list = Array.from(sentenceMap.entries()).map((item) => {
      return {
        chinese: item[0],
        english: item[1],
      };
    });
    writeFiction(JSON.stringify(list), inputPath);
  });
}
