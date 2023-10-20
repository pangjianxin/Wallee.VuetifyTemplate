<template>
    <v-container>
        <v-form v-model="createFormValid" ref="createFormRef" @submit.prevent="submitCreateIndicator">
            <v-card>
                <template #title>
                    创建指标
                </template>
                <template #subtitle>
                    填写信息完成指标创建
                </template>
                <template #text>
                    <v-row>
                        <v-col cols="12" md="6">
                            <v-select v-model="createForm.category" :items="categoryItems" item-title="text"
                                item-value="value" variant="outlined" label="指标类别" density="compact"
                                :rules="createFormRules.category">
                            </v-select>
                        </v-col>
                        <v-col cols="12" md="6">

                            <v-text-field v-model="createForm.name" label="指标名称" density="compact" variant="outlined"
                                :rules="createFormRules.name">
                            </v-text-field>
                        </v-col>
                        <v-col cols="12" md="6">
                            <v-text-field v-model="createForm.factor" type="number" label="指标系数" density="compact"
                                variant="outlined" :rules="createFormRules.factor">
                            </v-text-field>

                        </v-col>
                        <v-col cols="12" md="6">
                            <v-textarea rows="2" :auto-grow="true" v-model="createForm.description" label="指标描述"
                                :rules="createFormRules.description" variant="outlined">
                            </v-textarea>
                        </v-col>
                    </v-row>





                </template>
                <template #actions>
                    <v-spacer></v-spacer>
                    <v-btn type="submit" color="primary">
                        提交
                    </v-btn>
                </template>
            </v-card>


        </v-form>
    </v-container>
</template>

<script setup lang="ts">
import { IndicatorCategory } from '@/openapi';
import { useCreateIndicatorForm } from '../hooks/createIndicatorForm';
import { enum2arr } from '@/utils/app';
const { createFormValid, createForm, createFormRules, submitCreateIndicator } = useCreateIndicatorForm();
let createFormRef = ref();
const categoryItems = enum2arr(IndicatorCategory).map(it => {
    return {
        text: IndicatorCategory[it],
        value: it
    }
});

watch(() => createForm.category, newVal => console.log(newVal));
</script>

<style scoped></style>
<route lang="yaml">
name: indicator.create
meta:  
  title: 创建指标
  desc: 创建一个新的指标
  visible: false
  bottomMenu: false
  requriedAuth: true
</route>