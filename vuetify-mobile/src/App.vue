<template>
  <v-app :theme="theme">
    <router-view v-slot="{ Component, route }">
      <v-expand-transition>
        <component :is="Component" :key="route" />
      </v-expand-transition>
    </router-view>
  </v-app>
</template>
<script setup lang="ts">
import { RouterView } from 'vue-router/auto';
import { useMainStore } from '@/store/appMain';
const { theme } = storeToRefs(useMainStore());
</script>
<style scoped lang="scss"></style>
