<template>
    <div>
        1
    </div>
</template>

<script setup lang="ts">
import { IndicatorDto } from '@/openapi';
defineProps({
    indicators: {
        type: Array<IndicatorDto>,
        required: true
    }
})
</script>

<style scoped></style>