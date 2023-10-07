<template>
    <v-card class="login_container">
        <img src="../../assets/Frame-c100fb2f.png" class="frame" />
        <div class="group">
            <v-form v-model="valid" ref="formRef" @submit.prevent="handleSubmit">
                <v-card class="form">
                    <div class="text-h4 text-center">Hallo!</div>
                    <div class="mt-4">
                        <v-text-field label="手机号或者邮箱" autocomplete="username" v-model="form.username"
                            :rules="rules.username" variant="outlined" append-inner-icon="mdi-mail" clearable>
                        </v-text-field>
                    </div>
                    <div class="my-4">
                        <v-text-field type="password" autocomplete="current-password" label="密码" variant="outlined"
                            density="compact" v-model="form.password" :rules="rules.password" append-inner-icon="mdi-lock"
                            clearable>
                        </v-text-field>
                    </div>
                    <v-row justify="end" no-gutters>
                        <v-btn color="primary" append-icon="mdi-arrow-right" type="submit">
                            登录
                        </v-btn>
                        <v-btn color="warning" append-icon="mdi-arrow-right" @click="handleResetForm" class="ml-2">
                            登录
                        </v-btn>
                    </v-row>
                </v-card>
            </v-form>

            <v-card class="desc">
                <div class="logo mt-4">
                    <img :src="logo" height="60" />
                    <div class="text-h5 mt-2">Material UI</div>
                </div>
                <div class="mt-4">
                    vue-material-admin is a free open source mid-backend template based on Vuetify
                </div>
                <div class="mt-4">
                    made with by ❤️
                    <a target="_blank" style="
                            color: rgba(
                                var(--v-theme-on-background),
                                var(--v-high-emphasis-opacity)
                            );
                        " href="https://github.com/jaywoow">
                        Chen HuaJie
                    </a>
                </div>
            </v-card>
        </div>
    </v-card>
</template>
<script lang="ts" setup>
import logo from '@/assets/admin-logo.png';
import { usePasswordLogin } from './hooks/usePasswordLogin';
import { useOidcStore } from '@/store/oidcStore';
import { SubmitEventPromise } from 'vuetify';
import { useApplicationConfigurationStore } from "@/store/applicationConfigurationStore";
import { ApiError } from '@/openapi/core/ApiError';
const router = useRouter();
const { storeTokenInfo, storeUserInfo } = useOidcStore();
const { initConfig } = useApplicationConfigurationStore();
const {
    formRef, valid, loading,
    form,
    rules,
    login,
    getUserInfo } = usePasswordLogin();

const handleSubmit = async (e: SubmitEventPromise) => {
    let res = await e;
    if (res.valid === true) {
        try {
            loading.value = true;
            let tokenRes = await login(form);
            storeTokenInfo(tokenRes);
            let userRes = await getUserInfo();
            storeUserInfo(userRes);
            await initConfig();
            await router.push({ path: "/" });
        } finally {
            loading.value = false;
        }
    }
}

const handleResetForm = () => {
    formRef?.value.reset();
}

onErrorCaptured((err: Error) => {
    console.log(err);
    console.log(err instanceof ApiError);
    return false;
});
</script>
<style lang="scss" scoped>
.login_container {
    height: 100vh;
    overflow-y: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.5s;
    position: relative;
    overflow: hidden;

    .frame {
        position: absolute;
        left: -5%;
        top: -5%;
        width: 110%;
        height: 110%;
        filter: blur(20px);
    }

    .group {
        display: flex;
        position: relative;
        z-index: 1;
        border-radius: 20px;
        overflow: hidden;

        .form {
            width: 360px;
            margin: 0 auto;
            height: 400px;
            padding: 60px;

            .title {
                font-size: 36px;
                font-weight: 700;
                font-family: Roboto, sans-serif !important;
                margin-bottom: 20px;
            }
        }

        .desc {
            height: 100%;
            margin: 0 auto;
            width: 360px;
            background-image: linear-gradient(to bottom, #d4e5f5, #e1edf3);
            height: 400px;
            padding: 60px;
            text-align: center;

            .logo {
                text-align: center;
            }
        }
    }
}

@media only screen and (max-width: 778px) {
    .login_container {
        .group {
            .form {
                background: transparent;
            }

            .desc {
                display: none;
            }
        }
    }
}
</style>
<route lang="yaml">
name: login
meta: 
  title: 登录
  desc: 系统功能
  icon: mdi-login
  visible: true
  requiredAuth: true
  layout: empty
</route>