// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  imports: {
    autoImport: false,
  },
  devtools: {
    enabled: false,
  },
  app: {
    head: {
      title: "Article Translate English",
      link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
    },
  },
  css: ["~/assets/css/global.css"],
  modules: ["@nuxtjs/tailwindcss"],
});
