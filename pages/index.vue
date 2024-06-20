<template>
  <NuxtLink
    v-for="article in fictionsStore.fictionArticles"
    :key="article.id"
    :to="`/fiction/${article.id}`"
    className="group mb-3 rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
  >
    <div className="text-2xl font-CuteFont">{{ article.title }}</div>
    <div className="hidden lg:block text-xl font-CuteFont text-left py-2">
      {{ article.desc }}
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
import { useFictionsStore } from "~/store/fictions";

const fictionsStore = useFictionsStore();
</script>
