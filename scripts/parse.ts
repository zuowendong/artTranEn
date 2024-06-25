export function parse(
  raw: string,
  structure: {
    map: Map<number, string>;
    en_arr: string[];
    zh_arr: string[];
  }
) {
  const { en_arr, zh_arr, map } = structure;

  if (isChinese(raw)) {
    zh_arr.push(raw);
  } else {
    en_arr.push(raw);
  }

  zh_arr.forEach((item: string, index: number) => {
    map.set(index, item);
  });

  return en_arr.map((item: string, index: number) => {
    return {
      english: item,
      chinese: map.get(index),
    };
  });
}

function isChinese(str: string) {
  const reg = /.*[\u4e00-\u9fa5]+.*/;
  return reg.test(str);
}
