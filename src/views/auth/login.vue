<template>
    <div class="login-container">
        <div class="background-image">
            <section class="login-title">
                <TypeIt :values="content" className="type-it" :cursor="false" />
            </section>

            <a-form :model="formState" name="normal_login" class="login-form" @finish="onFinish" :label-col="{ span: 6 }"
                :wrapper-col="{ span: 24 }" @finishFailed="onFinishFailed">
                <p class="text-xl text-center mb-10">用户登录</p>
                <a-form-item label="用户名" name="mobile" :rules="[{ required: true, message: '请输入手机号！' }]">
                    <a-input v-model:value="formState.mobile">
                        <template #prefix>
                            <UserOutlined class="site-form-item-icon" />
                        </template>
                    </a-input>
                </a-form-item>

                <a-form-item label="密码" name="password" :rules="[{ required: true, message: '请输入密码！' }]">
                    <a-input-password v-model:value="formState.password">
                        <template #prefix>
                            <LockOutlined class="site-form-item-icon" />
                        </template>
                    </a-input-password>
                </a-form-item>
                <a-form-item :wrapper-col="{ offset: 4, span: 24 }">
                    <a-button size="large" style="width:100%;" type="primary" html-type="submit">
                        登录
                    </a-button>
                </a-form-item>
                <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
                    <a class="login-form-forgot" href="">忘记密码</a>
                    <a-divider type="vertical" />
                    <a class="login-form-forgot" href="">立即注册</a>
                </a-form-item>
            </a-form>
            <div class="login-footer">
                Copyright © 2024 新能源电池监控平台 All Rights Reserved.
            </div>
        </div>

    </div>
</template>

<script setup lang="ts">
/**
 * 打字机部分
 */
import TypeIt from '@/components/typeit'

let content: string[] = [
    '1. 这是一个基于Vue3.0和Ant Design Vue的后台管理系统',
    '2. 支持TypeScript',
    '3. 支持Ant Design Vue组件库',
]

const { login } = useAuth()
let Spin = inject('Spin')
interface FormState {
    mobile: string;
    password: string;
}

const formState = reactive<FormState>({
    mobile: '18888888888',
    password: 'admin888',
});
const onFinish = async (values: any) => {
    try {
        Spin(true)
        await login(values)
        Spin(false)
    } catch (error) {
        console.log('Failed:', error);
    } finally {
        Spin(false)
    }
};

const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
};
const disabled = computed(() => {
    return !(formState.mobile && formState.password);
});



</script>

<style lang="scss" scoped>
.login-container {
    width: 100vw;
    height: 100vh;
    box-sizing: border-box;
    position: relative;

    .background-image {
        box-sizing: border-box;
        width: 100vw;
        height: 100vh;
        position: relative;
        background: url('@/assets/images/bg/login.svg') no-repeat center center;
        background-size: cover;

        .login-title {
            // 字体
            font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
            color: #1577ff;
            position: absolute;
            top: 100px;
            left: 50%;
        }

        .type-it {
            font-size: 44px;
        }

        .text-container {
            position: absolute;
            border: 1px solid red;
            width: 500px;
            min-height: 200px;
            height: auto;
            top: 30px;
            left: 50%;


        }

        .login-form {
            border-radius: 7% 7% 8% 15% / 5% 6% 10% 53%;
            transition: all 0.5s;
            // 背景磨砂效果
            backdrop-filter: blur(10px);
            background-color: rgba(255, 255, 255, 0.8);
            box-sizing: border-box;

            // 当hover的时候
            &:hover {
                box-shadow:
                    2.8px 2.8px 2.2px rgba(0, 0, 0, 0.058),
                    6.7px 6.7px 5.3px rgba(0, 0, 0, 0.083),
                    12.5px 12.5px 10px rgba(0, 0, 0, 0.099),
                    22.3px 22.3px 17.9px rgba(0, 0, 0, 0.112),
                    41.8px 41.8px 33.4px rgba(0, 0, 0, 0.125),
                    100px 100px 80px rgba(0, 0, 0, 0.15);
            }

            box-shadow: 2.8px 2.8px 2.2px rgba(0, 0, 0, 0.02),
            6.7px 6.7px 5.3px rgba(0, 0, 0, 0.028),
            12.5px 12.5px 10px rgba(0, 0, 0, 0.035),
            22.3px 22.3px 17.9px rgba(0, 0, 0, 0.042),
            41.8px 41.8px 33.4px rgba(0, 0, 0, 0.05),
            100px 100px 80px rgba(0, 0, 0, 0.07);
            padding: 30px;
            box-sizing: border-box;
            position: absolute;
            right: 400px;
            top: 30%;
            width: 400px;
            height: 400px;
        }

        .login-footer {
            display: block;
            width:100%;
            height:24px;
            background-color: black;
            color:white;
            position: absolute;
            line-height: 24px;
            text-align: center;
            font-size: 12px;
            bottom:0px;
            box-sizing: border-box;
        }

        /* 替换为你的SVG文件路径 */
    }

}
</style>