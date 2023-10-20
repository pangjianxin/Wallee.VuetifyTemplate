<template>
  <v-app :theme="theme">
    <router-view>
    </router-view>
    <v-snackbar v-model="globalStore.snackbar" :color="globalStore.snackbarColor">
      {{ snackbarText }}
      <template #actions>
        <v-btn icon="mdi-close" @click="globalStore.closeSnackbar()" />
      </template>
    </v-snackbar>
    <v-overlay v-model="loading" app class="justify-center align-center">
      <v-progress-circular indeterminate size="64" />
    </v-overlay>
  </v-app>
</template>
<script setup lang="ts">
import { RouterView } from 'vue-router';
import { useMainStore } from '@/store/appMainStore';
import { useGlobalStore } from '@/store/globalStore';
import { ApiError } from './openapi/core/ApiError';

const { theme } = storeToRefs(useMainStore());
const globalStore = useGlobalStore();
const { snackbarText, loading } = storeToRefs(globalStore);

const parseAbpError = (response: any) => {
  if (response.error) {
    let message = response.error.message;
    if (response.error.validationErrors) {
      message += ': ' + response.error.validationErrors.map((e: any) => e.message).join(', ');
    }
    return message;
  }
  return null;
}

onErrorCaptured((err: Error) => {
  if (err instanceof ApiError) {
    let msg = parseAbpError(err.body);
    //let msg = err.body.message ?? err.body.error_description ?? err.body.error.details ?? err.body.error;
    globalStore.setSnackbarText(msg, "warning");
  }
  return false;
});
</script>
<style scoped lang="scss"></style>