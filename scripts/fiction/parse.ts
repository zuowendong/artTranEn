let lastLine = "";

export function parse(raw: string, map: Map<string, string>) {
  if (isChinese(raw)) {
    map.set(raw, lastLine);
  } else {
    lastLine = raw;
  }
}

function isChinese(str: string) {
  const reg = /.*[\u4e00-\u9fa5]+.*/;
  return reg.test(str);
}
