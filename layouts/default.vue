<template>
  <main
    className="flex min-h-screen flex-col items-center justify-between px-5 py-10 lg:p-24"
  >
    <Navbar v-if="route.path !== '/'"></Navbar>
    <div className="mb-32 grid w-full justify-items-center text-center">
      <slot></slot>
    </div>
  </main>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
</script>
