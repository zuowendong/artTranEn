import { useRoute } from "vue-router";
import { navigateTo } from "#app";
import { useFictionsStore } from "~/store/fictions";
import { computed, onMounted } from "vue";

export function useFiction() {
  const fictionsStore = useFictionsStore();
  const route = useRoute();
  const { id } = route.params;

  function handleGoHome() {
    navigateTo(`/`);
  }

  function getCurrentArticle() {
    fictionsStore.setCurrentArticle(Number(id));
  }

  const articleData = computed(() => fictionsStore.currentArticle);

  onMounted(() => {
    getCurrentArticle();
  });

  return {
    handleGoHome,
    articleData,
  };
}
