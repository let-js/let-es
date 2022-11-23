<template>
  <n-config-provider :theme="theme">
    <AppProvider>
      <router-view></router-view>
    </AppProvider>
  </n-config-provider>
</template>

<script setup>
import { ref } from 'vue'
import AppProvider from './components/Application.vue'

const theme = ref(null)
</script>

<style lang="scss" scoped></style>
