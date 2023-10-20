<template>
    <v-container class="login-container d-flex flex-column  justify-center" fluid>
        <v-form ref="formRef" v-model="valid" @submit.prevent="handleSubmit">
            <v-card :prepend-avatar="logo" variant="tonal" color="indigo">
                <template #title>
                    <div class="primary--text display-1">Indicator Report</div>
                </template>
                <template #subtitle>
                    普惠金融部指标报送
                </template>
                <template #text>
                    <v-text-field label="用户名" placeholder="用户名一般是你的员工号" autocomplete="off" v-model="form.username"
                        :rules="rules.username" density="compact" variant="outlined" append-inner-icon="mdi-mail">
                    </v-text-field>
                    <v-text-field type="password" placeholder="密码" autocomplete="off" label="密码" variant="outlined"
                        density="compact" v-model="form.password" :rules="rules.password" append-inner-icon="mdi-lock" class="mt-5">
                    </v-text-field>
                </template>
                <template #actions>
                    <v-spacer />
                    <v-btn color="secondary" append-icon="mdi-arrow-right" type="submit">
                        登录
                    </v-btn>
                    <v-btn color="warning" append-icon="mdi-circle-edit-outline" @click="handleResetForm" class="ml-2">
                        重置
                    </v-btn>
                </template>
            </v-card>
        </v-form>
    </v-container>
</template>
<script lang="ts" setup>
import logo from '@/assets/admin-logo.png';
import { usePasswordLogin } from './hooks/usePasswordLogin';
import { useOidcStore } from '@/store/oidcStore';
import { SubmitEventPromise } from 'vuetify';
import { useServerConfigStore } from "@/store/serverConfigStore";
import { useGlobalStore } from '@/store/globalStore';

const router = useRouter();
const { storeTokenInfo, storeUserInfo } = useOidcStore();
const { initConfig } = useServerConfigStore();
const { formRef, valid, form, rules, login, getUserInfo } = usePasswordLogin();
const globalStore = useGlobalStore();

const handleSubmit = async (e: SubmitEventPromise) => {
    let res = await e;
    if (res.valid === true) {
        try {
            globalStore.setLoading(true);
            let tokenRes = await login(form);
            storeTokenInfo(tokenRes);
            let userRes = await getUserInfo();
            storeUserInfo(userRes);
            await initConfig();
            await router.push({ path: "/" });
        } finally {
            globalStore.setLoading(false);
        }
    }
}

const handleResetForm = () => {
    formRef?.value.reset();
}

</script>
<style lang="scss" scoped>
.login-container {
    height: 100vh;
    background-image: url("/src/assets/login_bg2.png");
    background-size: 100% 100%;
}
</style>
<route lang="yaml">
name: login
meta: 
  title: 登录
  desc: 系统功能
  icon: mdi-login
  visible: false
  requiredAuth: true
  layout: empty
</route>