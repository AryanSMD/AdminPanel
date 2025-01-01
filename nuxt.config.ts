// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ['assets/css/style.css'],
  ssr: false,
  plugins: [
    { src: "~/plugins/sweetAlert", mode: "client" },
  ],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  build: {
    transpile: ['echarts', 'zrender', 'tslib', 'resize-detector'],
  },
  icon: {
    clientBundle: {
      scan: true,
      sizeLimitKb: 256,
    },
  },
  modules: [[
    '@vee-validate/nuxt',
    {
      autoImports: true,
      componentNames: {
        Form: 'VeeForm',
        Field: 'VeeInput',
        FieldArray: 'VeeInputArray',
        ErrorMessage: 'VeeErrorMessage',
      },
    },
  ], '@pinia/nuxt', '@vueuse/nuxt', "@nuxt/icon"],
  router: {
    options: {
      linkActiveClass: "link-active",
      linkExactActiveClass: "link-exact-active"
    }
  },
})