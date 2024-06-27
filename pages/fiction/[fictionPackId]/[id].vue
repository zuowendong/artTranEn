<template>
  <h1 class="text-2xl font-medium py-5">
    {{ articleData?.name }}
  </h1>

  <div
    v-for="(sentence, index) in articleData?.data"
    :key="index"
    class="text-left pb-10 relative w-full"
  >
    <n-tooltip placement="bottom-start" trigger="click">
      <template #trigger>
        <div class="leading-7 cursor-pointer">
          <span
            class="i-ph-speaker-simple-high"
            @click="handleSound(sentence.english)"
          ></span>
          <span class="hover:text-[#ff9900] pl-1">
            {{ englishLanguage() ? sentence.english : sentence.chinese }}
          </span>
        </div>
      </template>
      <span>
        {{ englishLanguage() ? sentence.chinese : sentence.english }}
      </span>
    </n-tooltip>
  </div>
</template>

<script setup lang="ts">
import { onMounted, computed } from "vue";
import { NTooltip } from "naive-ui";
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
