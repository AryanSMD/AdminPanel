<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>


<script setup>
useHead({
  htmlAttrs: {
    lang: 'en',
  },
  title: 'Admin Panel',
  charset: 'utf-8',
  meta: [
    { name: 'description', content: 'An Admin Panel built with Nuxt to show the potential of it ✨' },
  ],
  link: [
    { rel: 'icon', type: 'image/png', href: 'icon.png' }
  ]
})
</script>

<style scoped></style>