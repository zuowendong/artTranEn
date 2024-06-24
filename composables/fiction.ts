import { useRoute } from "vue-router";
import { useFictionsStore } from "~/store/fictions";
import { computed, onMounted } from "vue";

export function useFiction() {
  const fictionsStore = useFictionsStore();
  const route = useRoute();
  const { id } = route.params;

  function getCurrentArticle() {
    fictionsStore.setCurrentArticle(Number(id));
  }

  const articleData = computed(() => fictionsStore.currentArticle);
  const hasArticle = computed(() => !!articleData.value?.article.length);

  onMounted(() => {
    getCurrentArticle();
  });

  return {
    articleData,
    hasArticle,
  };
}
