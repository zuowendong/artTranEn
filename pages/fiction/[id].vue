<template>
  <div v-if="hasArticle">
    <h1 class="text-2xl font-medium py-5">
      {{ articleData?.enTitle }}
    </h1>

    <div
      v-for="(sentence, index) in articleData?.article"
      :key="index"
      class="text-left pb-10 relative"
    >
      <n-tooltip placement="bottom-start" trigger="click">
        <template #trigger>
          <div
            class="leading-7 cursor-pointer hover:text-[#ff9900]"
            @click="handleSound(sentence.english)"
          >
            {{ englishLanguage() ? sentence.english : sentence.chinese }}
          </div>
        </template>
        <span>
          {{ englishLanguage() ? sentence.chinese : sentence.english }}
        </span>
      </n-tooltip>
    </div>
  </div>
  <div v-else>这儿一片荒芜 ~~</div>
</template>

<script setup lang="ts">
import { NTooltip } from "naive-ui";
import { useFiction } from "~/composables/fiction";
import { useSound } from "~/composables/sound";
import { useLanguage } from "~/composables/language";

const { articleData, hasArticle } = useFiction();
const { handleSound } = useSound();
const { englishLanguage } = useLanguage();
</script>
