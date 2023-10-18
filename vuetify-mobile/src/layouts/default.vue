<template>
    <v-layout class="rounded rounded-md v-application" full-height>
        <v-navigation-drawer rounded elevation="1" :rail="rail" expand-on-hover :permanent="permanent"
            v-model="sideMenuModel" style="position: fixed;">
            <v-list nav>
                <v-list-item :prepend-avatar="logo" class="mx-1">
                    <v-list-item-title class="title">Material UI</v-list-item-title>
                    <v-list-item-subtitle>vue-material-admin</v-list-item-subtitle>
                </v-list-item>
            </v-list>
            <v-divider></v-divider>
            <recursiveMenu :routes="(routes as Array<RouteRecordRaw>)"></recursiveMenu>
        </v-navigation-drawer>
        <v-app-bar rounded elevation="1">
            <!--面包屑-->
            <Breadcrumbs v-if="!mobile" />
            <!--切换rail-->
            <div v-if="!mobile" @click="sideMenu.switchRail">
                <v-icon
                    :icon="rail === true ? 'mdi-arrow-right-bold-circle-outline' : 'mdi-arrow-left-bold-circle-outline'" />
            </div>
            <!--mobile下的按钮-->
            <template v-if="mobile">
                <div class="head_logo ml-4 mr-1">
                    <img :src="logo" height="40" />
                </div>
                <v-btn variant="text" icon="mdi-menu" @click="sideMenu.switchSideMenuModel">
                </v-btn>
            </template>

            <v-spacer></v-spacer>
            <!--搜索框-->
            <div v-if="!mobile" style="width: 220px" class="search_ip mr-2">
                <v-text-field rounded density="compact" variant="outlined" label="Search here"
                    prepend-inner-icon="mdi-magnify" single-line hide-details clearable></v-text-field>
            </div>
            <!--右侧工具栏-->
            <div class="d-flex flex-row align-center">
                <v-btn @click="mainStore.toggleTheme" variant="text" :icon="themeIcon" />
                <v-btn variant="text" icon="mdi-bell-outline">
                    <v-badge content="2" color="error">
                        <v-icon size="small"></v-icon>
                    </v-badge>
                </v-btn>
                <v-btn variant="text" append-icon="mdi-chevron-down" class="mr-2">
                    <v-avatar size="x-small" class="avatar mr-2">
                        <v-img :src="wxtx" alt="陈咩啊"></v-img>
                    </v-avatar>
                    <span v-if="!mobile">{{ applicationConfigurationStore.getCUrrentUserName }}</span>
                    <v-menu activator="parent">
                        <v-list nav class="h_a_menu">
                            <v-list-item title="Github" prepend-icon="mdi-github" @click="toGithub" />
                            <v-list-item title="Email" prepend-icon="mdi-email" @click="toEmail" />
                            <v-list-item title="Sign out" prepend-icon="mdi-login" to="/login" />
                        </v-list>
                    </v-menu>
                </v-btn>
            </div>
            <div style="position: fixed; right: 20px; bottom: 100px; z-index: 99999">
                <v-btn icon="mdi-cog" />
            </div>
        </v-app-bar>
        <v-main scrollable>
            <v-container fluid>
                <RouterView />
            </v-container>
        </v-main>
        <v-footer class="d-flex flex-column" app>
            <div class="py-2 text-center w-100">
                {{ new Date().getFullYear() }} — <strong>Wallee</strong>
            </div>
        </v-footer>
    </v-layout>
</template>
<script setup lang="ts">
import logo from '@/assets/admin-logo.png';
import wxtx from '@/assets/wx.png';
import Breadcrumbs from '@/components/breadcrumbs/breadcrumbs.vue';
import recursiveMenu from '@/layouts/components/recursiveMenu.vue';
import { routes } from "vue-router/auto/routes";
import { RouteRecordRaw } from 'vue-router/auto';
import { useSideMenu } from '@/store/sideMenu';
import { useMainStore } from '@/store/appMain';
import { useApplicationConfigurationStore } from '@/store/applicationConfigurationStore';
const sideMenu = useSideMenu();
const mainStore = useMainStore();
const applicationConfigurationStore = useApplicationConfigurationStore();

const { rail, sideMenuModel, permanent } = storeToRefs(sideMenu);
const { theme, mobile } = storeToRefs(mainStore);

const themeIcon = computed(() => {
    return theme.value === "dark" ? 'mdi-weather-sunny' : 'mdi-weather-night'
})

const toGithub = () => {
    window.open('https://github.com/armomu/vue-material-admin', '_blank');
};
const toEmail = () => {
    window.open('mailto:894620576@qq.com', '_blank');
};

watch(() => mobile.value, (newVal) => {
    sideMenu.updateSideMenuModel(!newVal);
    sideMenu.udpatePermanent(!newVal);
});

onErrorCaptured(err => {
    console.log(err);
    return true;
});
</script>
<style scoped lang="scss"></style>
