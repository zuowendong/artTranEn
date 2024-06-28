import Chapter1 from "~/public/CharlotteWeb/Chapter1.json";
import Chapter2 from "~/public/CharlotteWeb/Chapter2.json";
import Chapter3 from "~/public/CharlotteWeb/Chapter3.json";

export const fictionsArticles = [
  {
    id: 1,
    title: "夏洛的网",
    key: "CharlotteWeb",
    enTitle: "Charlotte's Web",
    desc: "",
    articles: [
      {
        id: 1,
        name: "Chapter 1 Before Breakfast",
        data: Chapter1,
      },
      {
        id: 2,
        name: "Chapter 2 Wilbur",
        data: Chapter2,
      },
      {
        id: 3,
        name: "Chapter 3 Escape",
        data: Chapter3,
      },
    ],
  },
  {
    id: 2,
    title: "小王子",
    key: "TheLittlePrince",
    desc: "",
    articles: [],
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
