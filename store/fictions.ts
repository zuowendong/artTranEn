import { defineStore } from "pinia";
import { ref } from "vue";
import { fictionsArticles } from "../assets/js/mock-fictions";

interface Chapter {
  english: string;
  chinese: string;
  showChinese?: boolean;
}

interface Article {
  id: number;
  name: string;
  data: Chapter[];
}

export interface FictionArticle {
  id: number;
  title: string;
  key: string;
  enTitle?: string;
  desc: string;
  articles: Article[];
}

export const useFictionsStore = defineStore("fictions", () => {
  const fictionArticles = ref<FictionArticle[]>(fictionsArticles);

  const currentFiction = ref<FictionArticle | null>(null);
  const currentArticle = ref<Article | null>(null);

  function getCurrentFiction(fictionId: number) {
    const targetIndex = fictionArticles.value.findIndex(
      (fiction) => fiction.id === fictionId
    );
    currentFiction.value = fictionArticles.value[targetIndex];
  }

  function getCurrentArticle(articleId: number) {
    if (!currentFiction.value) return;

    const articles = currentFiction.value.articles;
    const targetIndex = articles.findIndex(
      (article) => article.id === articleId
    );
    currentArticle.value = articles[targetIndex];
  }

  return {
    fictionArticles,
    currentFiction,
    getCurrentFiction,
    currentArticle,
    getCurrentArticle,
  };
});
