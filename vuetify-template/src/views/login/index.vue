<template>
    <v-card class="login_container">
        <img src="../../assets/Frame-c100fb2f.png" class="frame" />
        <div class="group">
            <v-card class="form">
                <div class="text-h4 text-center">Hallo!</div>
                <div class="mt-4">
                    <v-text-field label="手机号或者邮箱" variant="outlined" append-inner-icon="mdi-mail" clearable>
                    </v-text-field>
                </div>
                <div class="my-4">
                    <v-text-field type="password" label="密码" variant="outlined" density="compact"
                        append-inner-icon="mdi-lock" clearable>
                    </v-text-field>
                </div>
                <div style="text-align: right">
                    <v-btn color="primary" append-icon="mdi-arrow-right" size="large" type="submit"
                        href="/vue-material-admin/">
                        Go !
                    </v-btn>
                </div>
            </v-card>
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