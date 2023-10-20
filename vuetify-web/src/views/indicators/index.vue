<template>
  <v-container fluid>
    <v-btn @click="gotoCreate">create</v-btn>
  </v-container>
</template>

<script setup lang="ts">
import { Router } from 'vue-router/auto';
const router: Router = useRouter();
const gotoCreate = async () => {
  await router.push({ name: "indicator.create" });
}
</script>

<style scoped></style>
<route lang="yaml">
name: indicator.index
meta: 
  title: 指标查询
  desc: 指标管理
  visible: true
  bottomMenu: true
  requiredAuth: true
  icon: mdi-format-list-bulleted
</route>