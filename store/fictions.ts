import { defineStore } from "pinia";
import { ref } from "vue";
import CharlotteWeb from "~/public/CharlotteWeb/Chapter1.json";
interface Article {
  english: string;
  chinese: string;
  showChinese?: boolean;
}

export interface FictionArticle {
  id: number;
  title: string;
  key: string;
  enTitle?: string;
  desc: string;
  article: Article[];
}

export const useFictionsStore = defineStore("fictions", () => {
  const fictionArticles = ref<FictionArticle[]>([
    {
      id: 1,
      title: "夏洛的网",
      key: "CharlotteWeb",
      enTitle: "Charlotte's Web",
      desc: "",
      article: CharlotteWeb,
    },
    { id: 2, title: "小王子", key: "TheLittlePrince", desc: "", article: [] },
    {
      id: 3,
      title: "月亮与六便士",
      key: "MoonAndSixpence",
      desc: "",
      article: [],
    },
    {
      id: 4,
      title: "老人与海",
      key: "TheOldManAndTheSea",
      desc: "",
      article: [],
    },
    {
      id: 5,
      title: "自定义",
      key: "",
      desc: "自定义操作，支持复制，解析文章，语音播放，自动翻译",
      article: [],
    },
  ]);

  const currentArticle = ref<FictionArticle | null>(null);

  async function setCurrentArticle(id: number) {
    const targetIndex = fictionArticles.value.findIndex(
      (article) => article.id === id
    );

    currentArticle.value =
      targetIndex !== -1 ? fictionArticles.value[targetIndex] : null;
    console.log(111111, currentArticle.value);
  }

  return {
    fictionArticles,
    currentArticle,
    setCurrentArticle,
  };
});
