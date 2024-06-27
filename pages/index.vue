<template>
  <div
    v-for="article in fictionsStore.fictionArticles"
    :key="article.id"
    className="w-fit mb-3 rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
    @click="handleGotoPack(article.id)"
  >
    <div className="text-2xl font-CuteFont">{{ article.title }}</div>
    <div className="hidden lg:block text-xl font-CuteFont py-2">
      {{ article.desc }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { useFictionsStore } from "~/store/fictions";
import { navigateTo } from "#app";
const fictionsStore = useFictionsStore();

function handleGotoPack(fictionPackId: number) {
  navigateTo(`/fiction-pack/${fictionPackId}`);
}
</script>
