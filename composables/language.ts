import { ref } from "vue";

export const IS_ENGLISH = "isEnglish";

const isEnglish = ref(true);

function loadCache() {
  const storedValue = localStorage.getItem(IS_ENGLISH);
  if (storedValue !== null) {
    isEnglish.value = storedValue === "true";
  }
  update(isEnglish.value);
}

function update(value: boolean) {
  isEnglish.value = value;
  localStorage.setItem(IS_ENGLISH, String(value));
}

function remove() {
  localStorage.removeItem(IS_ENGLISH);
}

function toggleLanguage() {
  update(!isEnglish.value);
}

function englishLanguage(): boolean {
  return isEnglish.value;
}

export function useLanguage() {
  loadCache();

  return {
    isEnglish,
    remove,
    toggleLanguage,
    englishLanguage,
  };
}
