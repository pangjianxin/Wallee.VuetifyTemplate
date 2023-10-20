<template>
    <v-bottom-navigation v-model="selectedRoute" color="teal" grow absolute>
        <template v-for="menu in menuInfo" :key="menu.route">
            <v-btn :value="menu.route">
                <v-icon>{{ menu.icon }}</v-icon>
                {{ menu.title }}
            </v-btn>
        </template>
    </v-bottom-navigation>
</template>

<script setup lang="ts">
import { Router, RouteRecordRaw } from "vue-router/auto";
interface BottomMenu {
    icon: string,
    route: string,
    path: string,
    title: string
}

let menuInfo = ref<BottomMenu[]>([]);

let selectedRoute: Ref<string> = ref("");

const router: Router = useRouter();

let props = defineProps({
    routes: {
        type: Array<RouteRecordRaw>,
        required: true
    }
});

const recursiveRoute = (routes: RouteRecordRaw[]) => {
    menuInfo.value = [];
    let traverse = (route: RouteRecordRaw) => {
        if (route.children) {
            route.children.forEach(child => traverse(child));
        } else {
            if (route.meta && route.meta.visible === true && route.meta?.bottomMenu === true) {
                menuInfo.value.push({
                    icon: route.meta?.icon!,
                    title: route.meta?.title!,
                    route: route.name?.toString()!,
                    path: route.path
                })
            }
        }
    }
    routes.forEach(route => traverse(route));
}

const navigateTo = async (routeName: string) => {
    await router.replace({ name: routeName });
}

watch(() => props.routes,
    (newVal) => {
        recursiveRoute(newVal)
    },
    {
        deep: true,
        immediate: true
    });

watch(
    () => selectedRoute.value,
    async (newVal) => {
        await navigateTo(newVal);
    });
</script>

<style scoped></style>