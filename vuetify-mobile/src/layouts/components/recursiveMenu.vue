<template>
    <v-list :lines="false" density="compact" nav>
        <template v-for="(value, key) in menuInfo" :key="key">
            <v-list-subheader>{{ key }}</v-list-subheader>
            <template v-for="item in value" :key="item.name">
                <v-list-item :prepend-icon="(item.meta?.icon)" :title="(item.meta?.title as any)" :to="{ name: item.name }">
                </v-list-item>
            </template>
        </template>
    </v-list>
</template>
<script lang="ts" setup>
import { RouteRecordRaw } from 'vue-router';

let menuInfo = ref<Record<string, RouteRecordRaw[]>>({});

const recursiveRoute = (routes: RouteRecordRaw[]) => {
    menuInfo.value = {};

    let traverse = (route: RouteRecordRaw) => {
        if (route.children) {
            route.children.forEach(child => traverse(child));
        } else {
            if (route.meta && route.meta.desc && route.meta.visible === true) {
                if (!menuInfo.value[route.meta.desc as string] || menuInfo.value[route.meta.desc as string].length <= 0) {
                    menuInfo.value[route.meta.desc as string] = [];
                }
                menuInfo.value[route.meta.desc as string].push(route);
            }
        }
    }
    routes.forEach(route => traverse(route));
}

let props = defineProps({
    routes: {
        type: Array<RouteRecordRaw>,
        required: true
    },
    isMini: {
        type: Boolean,
        required: false
    }
});

watch(() => props.routes,
    (newVal) => {
        recursiveRoute(newVal)
    },
    {
        deep: true,
        immediate: true
    });
</script>