<template>
  <h1 class="text-2xl font-medium py-5">
    {{
      englishLanguage() ? articleData?.data.title_en : articleData?.data.title
    }}
  </h1>

  <template v-if="englishLanguage()">
    <div
      v-for="(sentence, index) in articleData?.data.data_en"
      :key="index"
      class="text-left pb-10 relative w-full flex items-start"
    >
      <span
        class="i-ph-speaker-simple-high cursor-pointer shrink-0 pt-7"
        @click="handleSound(sentence.english)"
      ></span>
      <span class="pl-2"> {{ sentence.english }}</span>
    </div>
  </template>
  <template v-else>
    <div
      v-for="(sentence, index) in articleData?.data.data_zh"
      :key="index"
      class="text-left pb-10 relative w-full"
    >
      <span> {{ sentence.chinese }}</span>
    </div>
  </template>
</template>

<script setup lang="ts">
import { onMounted, computed } from "vue";
import { useSound } from "~/composables/sound";
import { useLanguage } from "~/composables/language";
import { useFictionsStore } from "~/store/fictions";
import { useRoute } from "vue-router";

const { handleSound } = useSound();
const { englishLanguage } = useLanguage();

const { articleData } = useArticle();

function useArticle() {
  const fictionsStore = useFictionsStore();
  const route = useRoute();
  const { id } = route.params;

  const articleData = computed(() => fictionsStore.currentArticle);

  onMounted(() => {
    fictionsStore.getCurrentArticle(Number(id));
  });

  return {
    articleData,
  };
}
</script>
