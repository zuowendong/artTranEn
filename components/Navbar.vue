<template>
  <header class="w-full">
    <nav
      class="flex flex-wrap items-center justify-between w-full py-4 md:py-0 px-4 text-lg"
    >
      <NuxtLink href="/">
        <div class="flex items-center">
          <a href="#">
            <svg
              t="1719194055501"
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="4495"
              width="48"
              height="48"
            >
              <path
                d="M739.555556 227.555556V118.025481L229.56563 172.411259A25.941333 25.941333 0 0 0 208.592593 198.542222C208.592593 215.798519 222.587259 227.555556 246.518519 227.555556h493.037037z m75.851851 0h75.851852v600.215703C891.259259 934.798222 794.358519 1024 685.131852 1024H328.969481A196.683852 196.683852 0 0 1 132.740741 827.771259V194.56c1.85837-47.634963 35.536593-87.22963 85.333333-97.09037L815.407407 33.678222V227.555556zM208.592593 827.771259A120.832 120.832 0 0 0 328.969481 948.148148h356.162371C753.777778 948.148148 815.407407 891.448889 815.407407 827.771259V303.407407H246.518519c-13.312 0-26.093037-1.896296-37.925926-5.461333v529.825185z"
                fill="#ff9900"
                p-id="4496"
              ></path>
              <path
                d="M474.074074 796.444444v-265.481481H360.296296v-75.851852h303.407408v75.851852h-113.777778v265.481481z"
                fill="#000000"
                p-id="4497"
              ></path>
            </svg>
          </a>
          <span class="pl-3 hidden md:block">
            Bilingual Chinese-English Literary Translations
          </span>
        </div>
      </NuxtLink>

      <svg
        xmlns="<http://www.w3.org/2000/svg>"
        id="menu-button"
        class="h-6 w-6 cursor-pointer md:hidden block"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        @click="handleToggleMenu"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M4 6h16M4 12h16M4 18h16"
        />
      </svg>
      <div
        class="hidden w-full md:flex md:items-center md:w-auto"
        ref="menuRef"
      >
        <ul class="text-base pt-4 md:flex md:justify-between md:pt-2">
          <template v-for="optItem in HEADER_OPTIONS" :key="optItem.id">
            <li v-if="isAuthChapter(optItem.auth)">
              <span
                class="md:p-4 py-2 pl-3 hover:text-[#ff9900] flex items-center cursor-pointer"
                @click="optItem.eventName"
              >
                <span class="h-6 w-6" :class="optItem.icon"></span>
                <span class="text-sm font-medium pl-3">
                  {{ optItem.name }}
                </span>
              </span>
            </li>
          </template>
        </ul>
      </div>
    </nav>
  </header>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useRoute } from "vue-router";
import { navigateTo } from "#app";
import { Theme, useDarkMode } from "~/composables/darkMode";
import { useFictionsStore } from "~/store/fictions";
import { useSound } from "~/composables/sound";
import { useLanguage } from "~/composables/language";

const { darkMode, toggleDarkMode } = useDarkMode();
const fictionsStore = useFictionsStore();
const { handlePlayAll } = useSound();
const { toggleLanguage } = useLanguage();
const route = useRoute();

const menuRef = ref();

function handleToggleMenu() {
  menuRef.value.classList.toggle("hidden");
}

const isDarkMode = computed(() => darkMode.value === Theme.DARK);

const HEADER_OPTIONS = computed(() => {
  return [
    {
      id: 1,
      name: "中/英",
      icon: "i-ph-book-open-text-duotone",
      eventName: toggleLanguage,
      auth: ["article"],
    },
    {
      id: 2,
      name: "朗诵全文",
      icon: "i-ph-speaker-simple-high",
      eventName: () => {
        const _list = fictionsStore.currentArticle?.data || [];
        const list = _list.map((s) => s.english);
        handlePlayAll(list);
      },
      auth: ["article"],
    },
    {
      id: 3,
      name: "亮/暗",
      icon: isDarkMode.value ? "i-ph-moon" : "i-ph-sun",
      eventName: toggleDarkMode,
      auth: ["chapter", "article"],
    },
    {
      id: 4,
      name: "返回",
      icon: "i-ph-sign-out",
      eventName: () => {
        navigateTo(`/`);
      },
      auth: ["chapter", "article"],
    },
  ];
});

function isAuthChapter(authList: string[]) {
  if (route.fullPath.includes("fiction-pack")) {
    return authList.includes("chapter");
  } else {
    return authList.includes("article");
  }
}
</script>
