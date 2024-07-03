<template>
  <div class="w-full pt-8 grid grid-cols-1 md:grid-cols-4 gap-x-5 gap-y-10">
    <div
      v-for="article in fictionList?.articles"
      :key="article.id"
      class="card glass w-full shadow-md"
    >
      <div class="card-body">
        <h2 class="card-title">{{ article.name }}</h2>
        <p class="text-left">This is no description, how cares?</p>
        <div class="card-actions justify-end">
          <button
            class="btn btn-outline btn-info"
            @click="handleRead(article.id)"
          >
            Read Now
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { navigateTo } from "#app";
import { useFictionsStore } from "~/store/fictions";
import { useRoute } from "vue-router";

const fictionsStore = useFictionsStore();
const route = useRoute();
const fictionPackId = route.params.id;
const { fictionList, handleRead } = useFiction();

function useFiction() {
  const fictionList = computed(() => fictionsStore.currentFiction);
  onMounted(() => {
    fictionsStore.getCurrentFiction(Number(fictionPackId));
  });

  function handleRead(chapterId: number) {
    navigateTo(`/fiction/${fictionPackId}/${chapterId}`);
  }

  return {
    fictionList,
    handleRead,
  };
}
</script>

<style scoped>
.card-list {
  padding: 20px 0;
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  grid-column-gap: 20px;
  grid-row-gap: 30px;
}
.card-list-pc {
  grid-template-columns: repeat(4, 1fr);
}
</style>
