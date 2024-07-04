export function parse(text: string, chapterNum: number) {
  const START_SIGN = `Chapter ${chapterNum}`;
  const END_SIGN = `Chapter ${chapterNum + 1}`;

  const rawTextList = text.split("\n").map((t) => {
    return t.trim();
  });

  const startIndex = rawTextList.findIndex((t) => t === START_SIGN);
  let endIndex = rawTextList.findIndex((t) => t === END_SIGN);
  if (endIndex == -1) {
    endIndex = rawTextList.findIndex(
      (t) => t === "Antoine de Saint- Exupéry’s writings"
    );
  }

  const textList = rawTextList
    .slice(startIndex + 1, endIndex)
    // @ts-ignore
    .filter((t) => t && !/\d/.test(Number(t)));
  const result = [];
  for (let i = 0; i < textList.length; i++) {
    let data = {
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
      // 双空格 -> 单空格
      english = english.replace(/  +/g, " ");
      // 空格 + ,/.  -> ,/.
      english = english.replace(/ ([\.,])/g, "$1");
      data.english = english;
    }

    run();

    if (data.english) {
      result.push(data);
    }
  }

  return {
    title: START_SIGN,
    content: result,
  };
}

function isFullSentence(text: string) {
  if (!text) return false;
  return (
    text.endsWith("”") ||
    text.endsWith(":") ||
    text.endsWith("!") ||
    (text.endsWith(".") && isQuotesPaired(text))
  );
}

function isQuotesPaired(text: string): boolean {
  const stack: string[] = [];
  const leftQuotes = ["“", "‘"];
  const rightQuotes = ["”", "’"];

  for (const char of text) {
    if (leftQuotes.includes(char)) {
      stack.push(char);
    } else if (rightQuotes.includes(char)) {
      if (
        stack.length === 0 ||
        (stack[stack.length - 1] === "“" && char !== "”") ||
        (stack[stack.length - 1] === "‘" && char !== "’")
      ) {
        return false; // 匹配错误
      } else {
        stack.pop(); // 匹配成功，出栈
      }
    }
  }

  return stack.length === 0; // 栈为空，说明所有引号都匹配了
}
