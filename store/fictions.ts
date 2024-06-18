import { defineStore } from "pinia";
import { ref } from "vue";

export interface FictionArticle {
  id: number;
  title: string;
  article: string;
}

export const useFictionsStore = defineStore("fictions", () => {
  const fictionArticles = ref<FictionArticle[]>([
    { id: 1, title: "夏洛特的网", article: "" },
    { id: 2, title: "小王子", article: "" },
    { id: 3, title: "月亮与六便士", article: "" },
    { id: 4, title: "老人与海", article: "" },
  ]);

  const currentArticle = ref<FictionArticle | null>(null);

  function setCurrentArticle(id: number) {
    const targetIndex = fictionArticles.value.findIndex(
      (article) => article.id === id
    );
    currentArticle.value =
      targetIndex !== -1
        ? {
            ...fictionArticles.value[targetIndex],
            article: "xxxxxxxxxxxxx",
          }
        : null;
  }

  return {
    fictionArticles,
    currentArticle,
    setCurrentArticle,
  };
});
