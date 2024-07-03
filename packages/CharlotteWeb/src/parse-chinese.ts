export function parse(text: string, chapterNum: number) {
  const rawTextList = text.split("\n").map((t) => {
    return t.trim();
  });

  const _rawTextList = removeExcess(rawTextList);

  let startIndex = -1;
  let endIndex = -1;

  // 特殊处理，第6章 无序号
  if (chapterNum === 5) {
    startIndex = _rawTextList.findIndex((t) => t.startsWith(`${chapterNum}`));
    endIndex = _rawTextList.findIndex((t) => t.startsWith(`.夏日`));
  } else if (chapterNum === 6) {
    startIndex = _rawTextList.findIndex((t) => t.startsWith(`.夏日`));
    endIndex = _rawTextList.findIndex((t) => t.startsWith(`${chapterNum + 1}`));
  } else {
    startIndex = _rawTextList.findIndex((t) => t.startsWith(`${chapterNum}`));
    endIndex = _rawTextList.findIndex((t) => t.startsWith(`${chapterNum + 1}`));
  }
  if (endIndex === -1) {
    endIndex = _rawTextList.findIndex((t) => t === "完");
  }

  const chapterTitle = _rawTextList[startIndex];

  const textList = _rawTextList
    .slice(startIndex + 1, endIndex)
    // @ts-ignore
    .filter((t) => t && !/\d/.test(Number(t)));

  // 特殊处理，删除批注
  const commentIndex = textList.findIndex((t) => t.startsWith("-----"));
  if (commentIndex !== -1) {
    textList.splice(commentIndex, textList.length - commentIndex);
  }

  const result = [];
  for (let i = 0; i < textList.length; i++) {
    let data = {
      chinese: "",
    };
    function run() {
      const element = textList[i];
      // console.log("原始的句子", element);
      let chinese = "";

      if (isFullSentence(element)) {
        chinese = element;
        // console.log("完整的句子", chinese);
      } else {
        chinese += element;
        // console.log("断开的句子", chinese);

        while (textList[i + 1] && !isFullSentence(textList[i + 1])) {
          chinese += textList[i + 1];
          i++;
        }

        if (i !== textList.length - 1) {
          chinese += textList[i + 1];
          i++;
        }
      }

      // console.log("拼接的句子", chinese);
      data.chinese = chinese;
    }

    run();

    if (data.chinese) {
      result.push(data);
    }
  }

  return {
    title: chapterTitle,
    content: result,
  };
}

function removeExcess(rawTextList: string[]) {
  let startIndex = rawTextList.findIndex((t) => t.startsWith("1"));
  return rawTextList.slice(startIndex);
}

function isFullSentence(text: string) {
  if (!text) return false;
  // if (text.endsWith("。")) {
  //   return isQuotesPaired(text);
  // }

  return text.endsWith("”") || (text.endsWith("。") && isQuotesPaired(text));
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
