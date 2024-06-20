import { defineStore } from "pinia";
import { ref } from "vue";
import CharlotteWeb from "~/public/fictions/CharlotteWeb.json";

interface Article {
  en: string;
  zh: string;
}

export interface FictionArticle {
  id: number;
  title: string;
  desc: string;
  article: Article[];
}

export const useFictionsStore = defineStore("fictions", () => {
  const fictionArticles = ref<FictionArticle[]>([
    {
      id: 1,
      title: "夏洛的网",
      desc: "一只名叫威尔伯的小猪和一只叫夏洛的蜘蛛成为朋友。小猪未来的命运是成为圣诞节时的盘中大餐，这个悲凉的结果让威尔伯心惊胆寒。它也曾尝试过逃跑，但它毕竟是一只猪。看似渺小的夏洛却说：让我来帮你。于是夏洛用它的网在猪棚中织出王牌猪、朱克曼的名猪等字样，那些被人类视为奇迹的字让威尔伯的命运整个逆转，终于得到了比赛的特别奖和一个安享天命的未来。但就在这时，蜘蛛夏洛的生命却走到了尽头...",
      article: CharlotteWeb,
    },
    { id: 2, title: "小王子", desc: "", article: [] },
    { id: 3, title: "月亮与六便士", desc: "", article: [] },
    { id: 4, title: "老人与海", desc: "", article: [] },
  ]);

  const currentArticle = ref<FictionArticle | null>(null);

  function setCurrentArticle(id: number) {
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
