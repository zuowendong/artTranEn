<template>
  <div>
    <button class="btn btn-primary text-white" @click="handleGoHome">
      回到主页
    </button>

    {{ articleData?.title }}

    <div class="">{{ articleData?.article }}</div>
  </div>
</template>

<script setup lang="ts">
import { useFiction } from "~/composables/fiction";

const { handleGoHome, articleData } = useFiction();
</script>
