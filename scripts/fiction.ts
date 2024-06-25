import path, { dirname } from "node:path";
import fs from "node:fs";
import { fileURLToPath } from "node:url";
import { readFiction } from "./fiction/file";

const __dirname = dirname(fileURLToPath(import.meta.url));

function readAllFictions(key: string) {
  const directoryPath = path.resolve(__dirname, `../public/${key}`);

  fs.readdir(directoryPath, (err, files) => {
    if (err) {
      console.error("无法读取目录:", err);
      return;
    }

    const mdFiles = files.filter((file) => path.extname(file) === ".md");
    mdFiles.forEach((fileName) => {
      const inputPath = path.resolve(__dirname, `${directoryPath}/${fileName}`);

      const sentenceMap = new Map();
      readFiction(inputPath, sentenceMap);
    });
  });
}

readAllFictions("CharlotteWeb");
