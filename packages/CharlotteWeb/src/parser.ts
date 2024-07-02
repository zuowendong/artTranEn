// const START_SIGN = "CHAPTER 2";
// const END_SIGN = "CHAPTER 3";

export function parse(text: string, chapterNum: number) {
  const START_SIGN = `CHAPTER ${chapterNum}`;
  const END_SIGN = `CHAPTER ${chapterNum + 1}`;

  const rawTextList = text.split("\n").map((t) => {
    return t.trim();
  });

  const { startTitle, endTitle, _rawTextList } = getTitle(
    rawTextList,
    START_SIGN,
    END_SIGN
  );
  const startIndex = _rawTextList.findIndex((t) => t === startTitle);
  const endIndex =
    endTitle === "end"
      ? _rawTextList.length
      : _rawTextList.findIndex((t) => t === endTitle);

  const textList = _rawTextList
    .slice(startIndex + 1, endIndex)
    // @ts-ignore
    .filter((t) => t && !/\d/.test(Number(t)))
    .filter(
      (str) =>
        str != "两小无猜儿童网 www.lxwc.com.cn" &&
        str != "Charlotte's Web by E.B.White"
    );

  const result = [];
  for (let i = 0; i < textList.length; i++) {
    let data = {
      chinese: "",
      english: "",
    };
    // console.log("初始==>", textList[i]);

    function run() {
      const element = textList[i];
      let english = "";

      if (isFullSentence(element)) {
        english = element;
        // console.log("完整的句子", element);
      } else {
        english += element;
        // console.log("断句", english);

        while (!isFullSentence(textList[i + 1])) {
          english += " " + textList[i + 1];
          i++;
        }

        english += " " + textList[i + 1];
        i++;
      }

      data.english = english;

      // console.log("拼接的句子", english);
    }

    run();

    if (data.english) {
      result.push(data);
    }
  }

  return {
    title: startTitle,
    content: result,
  };
}

function isFullSentence(text: string) {
  if (!text) return false;
  if (text.endsWith(".") || text.endsWith("?")) {
    function countChar(str: string, char: string) {
      return str
        .split("")
        .reduce((acc, current) => (current === char ? acc + 1 : acc), 0);
    }

    return countChar(text, '"') % 2 == 0;
  }

  return text.endsWith('"') || text.endsWith("!") || text.endsWith(")");
}

function getTitle(rawTextList: string[], START_SIGN: string, END_SIGN: string) {
  const startIndex = rawTextList.findIndex((t) => t.startsWith(START_SIGN));
  let chapterTitle_start =
    startIndex !== -1 ? formatChapterTitle(rawTextList[startIndex]) : "";

  let endIndex = rawTextList.findIndex((t) => t.startsWith(END_SIGN));
  let chapterTitle_end =
    endIndex !== -1 ? formatChapterTitle(rawTextList[endIndex]) : "end";
  const _rawTextList =
    endIndex === -1
      ? rawTextList.slice(startIndex)
      : rawTextList.slice(endIndex);

  return {
    startTitle: chapterTitle_start,
    endTitle: chapterTitle_end,
    _rawTextList,
  };
}

function formatChapterTitle(title: string) {
  return title.slice(0, title.lastIndexOf(" ")).replace(/·/gm, "").trim();
}
