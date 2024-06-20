<template>
  <div>
    <button class="btn btn-primary text-white" @click="handleGoHome">
      回到主页
    </button>

    {{ articleData?.title }}

    <div
      v-for="(sentence, index) in articleData?.article"
      class="text-left leading-10 no-underline hover:underline"
    >
      {{ sentence.en }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { useFiction } from "~/composables/fiction";

const { handleGoHome, articleData } = useFiction();
</script>
