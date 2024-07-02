import fs from "fs";
import path from "path";
import pdf from "pdf-parse";
import { parse } from "./parser";

const targetPath = path.resolve(__dirname, "../data/CharlotteWeb-en.pdf");
const outputPath = path.resolve(__dirname, "../data/json");
const fictions = fs.readdirSync(path.resolve(__dirname, "../data/json"));

(async function () {
  let dataBuffer = fs.readFileSync(targetPath);
  const rawPDFData = await pdf(dataBuffer);

  // for (let i = 1; i <= 22; i++) {
  //   const result = parse(rawPDFData.text, i);
  //   save(JSON.stringify(result.content), result.title);
  // }

  const result = parse(rawPDFData.text, 22);
  save(JSON.stringify(result.content), result.title);

  const fictionList = await Promise.all(
    fictions.map((fileName, index) => {
      const fictionName = path.parse(fileName).name;
      return {
        fileName,
        fictionName,
      };
    })
  );

  console.log(fictionList);

  const articleList: any = [];

  await Promise.all(
    fictionList.map((fiction, index) => {
      const { fileName, fictionName } = fiction;

      const jsonText = fs.readFileSync(
        path.resolve(__dirname, `../data/json/${fileName}`),
        "utf-8"
      );

      articleList.push({
        id: index + 1,
        name: fictionName,
        data: JSON.parse(jsonText),
      });
    })
  );
})();

function save(content: string, fileName: string) {
  const filePath = path.resolve(outputPath, `${fileName}.json`);
  fs.writeFileSync(filePath, content);
  console.log(`${fileName}.json 写入成功`);
}
