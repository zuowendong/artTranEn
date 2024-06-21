<template>
  <button class="btn btn-primary text-white w-40" @click="handleGoHome">
    回到主页
  </button>

  <div v-if="hasArticle">
    <h1 class="text-lg font-medium">
      {{ articleData?.title }}
    </h1>
    <div
      v-for="(sentence, index) in articleData?.article"
      :key="index"
      class="text-left pb-10 relative"
    >
      <n-tooltip placement="bottom-start" trigger="click">
        <template #trigger>
          <div
            class="leading-7 cursor-pointer hover:text-red"
            @click="handleSound(sentence.english)"
          >
            {{ sentence.english }}
          </div>
        </template>
        <span> {{ sentence.chinese }} </span>
      </n-tooltip>
    </div>
  </div>
</template>

<script setup lang="ts">
import { NTooltip } from "naive-ui";
import { computed } from "vue";
import { useFiction } from "~/composables/fiction";

const { handleGoHome, articleData } = useFiction();

const hasArticle = computed(() => !!articleData.value?.article.length);

function getPronunciationUrl(english: string | undefined): string {
  return `https://dict.youdao.com/dictvoice?type=2&audio=${english}`;
}

const audio = new Audio();
function updateSource(src: string) {
  audio.src = src;
  audio.load();

  audio.play();
}

function handleSound(str: string) {
  const pronunciationUrl = getPronunciationUrl(str);
  updateSource(pronunciationUrl);
}
</script>
