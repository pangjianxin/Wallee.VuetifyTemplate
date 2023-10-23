<template>
    <v-list :lines="false" density="compact" nav>
        <template v-for="(value, key) in menus" :key="key">
            <v-list-subheader>{{ key }}</v-list-subheader>
            <template v-for="item in value" :key="item.name">
                <v-list-item :prepend-icon="(item.icon)" :title="(item.title as any)" :to="{ name: item.routeName }">
                </v-list-item>
            </template>
        </template>
    </v-list>
</template>
<script lang="ts" setup>
import { MenuInfo } from 'typings/env';
import { PropType } from 'vue';

defineProps({
    menus: {
        type: Object as PropType<Record<string, Array<MenuInfo>>>,
        required: true
    },
    isMini: {
        type: Boolean,
        required: false
    }
});
</script>