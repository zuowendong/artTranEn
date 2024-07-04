import fs from "fs";
import path from "path";
import pdf from "pdf-parse";
import { parse as parseEnglish } from "./parser-english";
import { parse as parseChinese } from "./parse-chinese";

const targetPath = path.resolve(__dirname, "../data/TheLittlePrince-en.pdf");
const targetPath_zh = path.resolve(__dirname, "../data/TheLittlePrince-zh.pdf");
const outputPath = path.resolve(__dirname, "../data/json");
const fictions = fs.readdirSync(outputPath);

(async function () {
  let dataBuffer_en = fs.readFileSync(targetPath);
  const rawPDFData_en = await pdf(dataBuffer_en);

  let dataBuffer_zh = fs.readFileSync(targetPath_zh);
  const rawPDFData_zh = await pdf(dataBuffer_zh);

  for (let i = 1; i <= 27; i++) {
    const { content, title } = parseChinese(rawPDFData_zh.text, i);
    const { content: contentEn, title: titleEn } = parseEnglish(
      rawPDFData_en.text,
      i
    );

    const contentData = {
      title,
      title_en: titleEn,
      data_en: contentEn,
      data_zh: content,
    };

    save(JSON.stringify(contentData), titleEn);
  }

  const fictionList = await Promise.all(
    fictions.map((fileName) => {
      const fictionName = path.parse(fileName).name;
      return {
        fileName,
        fictionName,
      };
    })
  );

  const articleList: any = [];

  await Promise.all(
    fictionList.map((fiction) => {
      const { fileName, fictionName } = fiction;

      const jsonText = fs.readFileSync(
        path.resolve(__dirname, `../data/json/${fileName}`),
        "utf-8"
      );

      articleList.push({
        id: extractNumbers(fictionName),
        name: fictionName,
        data: JSON.parse(jsonText),
      });
    })
  );

  const articlePath = path.resolve(
    __dirname,
    "../../../assets/js/TheLittlePrince.json"
  );
  fs.writeFileSync(
    articlePath,
    JSON.stringify(
      articleList.sort((a: any, b: any) => {
        return a.id - b.id;
      })
    )
  );
})();

function save(content: string, fileName: string) {
  const filePath = path.resolve(outputPath, `${fileName}.json`);
  fs.writeFileSync(filePath, content);
  console.log(`${fileName}.json 写入成功`);
}

function extractNumbers(str: string) {
  let numbers = "";
  for (let i = 0; i < str.length; i++) {
    if (!isNaN(parseInt(str[i]))) {
      numbers += str[i];
    }
  }
  return Number(numbers);
}
