import CharlotteWeb from "./mock-fictions.json";
import TheLittlePrince from "./TheLittlePrince.json";

export const fictionsArticles = [
  {
    id: 1,
    title: "夏洛的网",
    key: "CharlotteWeb",
    enTitle: "Charlotte's Web",
    desc: "",
    articles: CharlotteWeb,
  },
  {
    id: 2,
    title: "小王子",
    key: "TheLittlePrince",
    desc: "",
    articles: TheLittlePrince,
  },
  {
    id: 3,
    title: "月亮与六便士",
    key: "MoonAndSixpence",
    desc: "",
    articles: [],
  },
  {
    id: 4,
    title: "老人与海",
    key: "TheOldManAndTheSea",
    desc: "",
    articles: [],
  },
  {
    id: 5,
    title: "自定义",
    key: "",
    desc: "自定义操作，支持复制，解析文章，语音播放，自动翻译",
    articles: [],
  },
];
