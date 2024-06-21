<template>
  <div>
    <button class="btn btn-primary text-white" @click="handleGoHome">
      回到主页
    </button>

    {{ articleData?.title }}

    <div
      v-for="(sentence, index) in articleData?.article"
      class="text-left h-[80px] leading-10"
    >
      <div class="no-underline hover:underline cursor-pointer">
        {{ sentence.english }}
      </div>
      <div>{{ sentence.chinese }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useFiction } from "~/composables/fiction";

const { handleGoHome, articleData } = useFiction();
</script>
