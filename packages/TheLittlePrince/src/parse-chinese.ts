export function parse(text: string, chapterNum: number) {
  const rawTextList = text.split("\n").map((t) => {
    return t.trim();
  });

  const startTitle = toRoman(chapterNum);
  const startIndex = rawTextList.findIndex((t) => t === startTitle);
  const endTitle = toRoman(chapterNum + 1);
  let endIndex = rawTextList.findIndex((t) => t === endTitle);

  if (endIndex === -1) {
    endIndex = rawTextList.findIndex((t) => t === "（全文完）");
  }

  const textList = rawTextList
    .slice(startIndex + 1, endIndex)
    // @ts-ignore
    .filter((t) => t && !/\d/.test(Number(t)))
    .filter((t) => t !== "★ ★ ★ ★ ★");

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

    console.log(result);
  }

  return {
    title: `第${chapterNum}章`,
    content: result,
  };
}

const romanMap: Record<number, string> = {
  1: "I",
  4: "IV",
  5: "V",
  9: "IX",
  10: "X",
  40: "XL",
  50: "L",
  90: "XC",
  100: "C",
  400: "XD",
  500: "D",
  900: "CM",
  1000: "M",
};
function toRoman(num: number): string {
  let roman = "";
  const keys = Object.keys(romanMap).reverse();

  for (let i = 0; i < keys.length; i++) {
    const key = parseInt(keys[i]);
    while (num >= key) {
      roman += romanMap[key];
      num -= key;
    }
  }
  return roman;
}

function isFullSentence(text: string) {
  if (!text) return false;
  return (
    text.endsWith("”") ||
    text.endsWith("！") ||
    text.endsWith("......") ||
    (text.endsWith("。") && isQuotesPaired(text))
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
