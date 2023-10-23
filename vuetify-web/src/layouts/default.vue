<template>
    <v-layout class="rounded rounded-md v-application" full-height>
        <v-navigation-drawer rounded elevation="1" :rail="rail" expand-on-hover :permanent="permanent"
            :temporary="temporary" v-model="sideMenuModel">
            <v-list nav>
                <v-list-item :prepend-avatar="logo" class="mx-1">
                    <v-list-item-title class="title">IndicatorReport</v-list-item-title>
                    <v-list-item-subtitle>普惠金融部指标填报系统</v-list-item-subtitle>
                </v-list-item>
            </v-list>
            <v-divider></v-divider>
            <sideMenu :menus="menuList.sideMenuList"></sideMenu>
        </v-navigation-drawer>
        <v-app-bar rounded elevation="1">
            <!--面包屑-->
            <Breadcrumbs v-if="!mobile" />
            <!--切换rail-->
            <div v-if="!mobile" @click="sideMenuStore.switchRail">
                <v-icon
                    :icon="rail === true ? 'mdi-arrow-right-bold-circle-outline' : 'mdi-arrow-left-bold-circle-outline'" />
            </div>
            <!--mobile下的按钮-->
            <template v-if="mobile">
                <div class="head_logo ml-4 mr-1">
                    <img :src="logo" height="40" />
                </div>
                <v-app-bar-nav-icon @click="sideMenuStore.switchSideMenuModel"></v-app-bar-nav-icon>
            </template>

            <v-spacer></v-spacer>
            <!--搜索框-->
            <div v-if="!mobile" style="width: 220px" class="search_ip mr-2">
                <v-text-field rounded density="compact" variant="outlined" label="Search here"
                    prepend-inner-icon="mdi-magnify" single-line hide-details clearable>
                </v-text-field>
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
                        <v-img :src="wxtx" alt="wallee"></v-img>
                    </v-avatar>
                    <span v-if="!mobile">{{ serverConfigStore.getCUrrentUserName }}</span>
                    <v-menu activator="parent">
                        <v-list nav>
                            <v-list-item title="我的账户" prepend-icon="mdi-account-edit" @click="gotoAccount" />
                            <v-list-item title="退出登录" prepend-icon="mdi-login" to="/login" />
                        </v-list>
                    </v-menu>
                </v-btn>
            </div>
            <div style="position: fixed; right: 20px; bottom: 100px; z-index: 99999">
                <v-btn icon="mdi-cog" />
            </div>
        </v-app-bar>
        <v-main scrollable>
            <router-view>
            </router-view>
        </v-main>
        <bottomMenuVue :menus="menuList.bottomMenuList"></bottomMenuVue>
    </v-layout>
</template>
<script setup lang="ts">
import logo from '@/assets/admin-logo.png';
import wxtx from '@/assets/user.png';
import Breadcrumbs from '@/components/breadcrumbs/breadcrumbs.vue';
import sideMenu from '@/layouts/components/sideMenu.vue';
import bottomMenuVue from './components/bottomMenu.vue';
import { useSideMenu } from '@/store/sideMenu';
import { useMainStore } from '@/store/appMainStore';
import { useServerConfigStore } from '@/store/serverConfigStore';
import { RouteRecordRaw } from 'vue-router';
import { MenuInfo } from 'typings/env';
import { routes } from "vue-router/auto/routes";

const sideMenuStore = useSideMenu();
const mainStore = useMainStore();
const serverConfigStore = useServerConfigStore();
const router = useRouter();
const { rail, sideMenuModel, permanent, temporary } = storeToRefs(sideMenuStore);
const { theme, mobile } = storeToRefs(mainStore);

const themeIcon = computed(() => {
    return theme.value === "dark" ? 'mdi-weather-sunny' : 'mdi-weather-night'
});

const gotoAccount = async () => {
    await router.push({ name: "account" });
};

const menuList = computed(() => {
    let sideMenuList: Record<string, MenuInfo[]> = {};
    let bottomMenuList: Array<MenuInfo> = [];
    let traverse = (route: RouteRecordRaw) => {
        if (route.children && route.children.length > 0) {
            route.children.forEach((child) => traverse(child));
        } else {
            if (route.meta?.visible === true) {
                if (route.meta?.bottomMenu === true) {
                    bottomMenuList.push({
                        icon: route.meta.icon!,
                        title: route.meta.title!,
                        routeName: route.name?.toString()!,
                        path: route.path
                    })
                }
                else {
                    if (!sideMenuList[route.meta.desc as string]) {
                        sideMenuList[route.meta.desc as string] = [];
                    }
                    sideMenuList[route.meta.desc as string].push({
                        title: route.meta.title as string,
                        routeName: route.name as string,
                        icon: route.meta.icon as string,
                        path: route.path
                    });
                }
            }
        }
    }
    routes.forEach(route => traverse(route));
    return {
        sideMenuList,
        bottomMenuList
    };
})

</script>
<style scoped lang="scss"></style>