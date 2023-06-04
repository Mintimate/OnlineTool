<template>
    <div style="margin-top: 1rem" class="container">
        <a-row>
            <a-col id="tittle">
                <h1>在线强密码生成</h1>
            </a-col>
        </a-row>
        <a-card style="text-align: left" title="密码复杂度">
            <a-form layout="horizontal"
                    size="large"
                    auto-label-width>
                <a-form-item field="beginLine" label="密码长度" label-col-flex="5rem"
                             label-col-style="margin-right: 4.5rem">
                    <a-select
                            v-model="passwordLength"
                            :style="{width:'320px'}" placeholder="选择生成密码的长度">
                        <template #label="{ data }">
                            <span><icon-lock style="margin-right: 0.5rem"/>{{ data.label }}位密码</span>
                        </template>
                        <a-option>8</a-option>
                        <a-option>16</a-option>
                        <a-option>32</a-option>
                        <a-option>64</a-option>
                    </a-select>
                    <template #extra>
                        <div>指定生成的密码的长度；通常，密码越长，密码强度越高，破解难度越大。</div>
                    </template>
                </a-form-item>
                <a-form-item field="endLine" label="密码包含" label-col-flex="5rem"
                             label-col-style="margin-right: 4.5rem">
                    <a-checkbox v-model="passwordElement.number">数字 0-9</a-checkbox>
                    <a-checkbox v-model="passwordElement.lowercase">小写字母 a-z</a-checkbox>
                    <a-checkbox v-model="passwordElement.uppercase">大写字母 A-Z</a-checkbox>
                    <a-checkbox v-model="passwordElement.special">特殊字符</a-checkbox>
                    <template #extra>
                        <div>指定密码的组成规则，要求至少选择一项（推荐勾选2项以上）。</div>
                    </template>
                </a-form-item>
            </a-form>
            <a-divider orientation="center">
                <icon-experiment/>
            </a-divider>
            <a-space align="center" direction="vertical" fill style="text-align: center">
                <a-button @click="getNewComplexPassword()" size="large" long>生成强密码</a-button>
                <div class="arco-form-item-extra">
                    <div>此工具在您的设备上生成密码(客户端)<br/>
                        这些密码不会传送到我们的服务器
                    </div>
                </div>
            </a-space>
        </a-card>
        <a-card style="text-align: left;margin-top: 1.5rem" title="生成的密码">
            <a-row style="text-align:center;margin-top: 2rem">
                <a-col>
                    <a-typography-text copyable
                                       style="word-break:break-all"
                                       :ellipsis="{rows: 8, expandable: true,}">
                        <span class="code">{{ complexPassword }}</span>
                    </a-typography-text>
                    <div class="arco-form-item-extra" v-if="infoTip">
                        <a-rate v-model="scoreForPassword" readonly/>
                        <div>密码建议：{{ infoTip }}～</div>
                    </div>
                </a-col>
            </a-row>
        </a-card>
    </div>
</template>

<script setup>
import {computed, reactive, ref} from "vue";
import {getPWD} from "@/until/ComplexPassword.js";
import {checkPWD, getScorePWD} from "@/until/CheckComplexPassword.js";

let complexPassword = ref("...Loading")
// 生成密码的长度
let passwordLength = ref(16)
// 密码组成
let passwordElement = reactive({
    number: true,
    lowercase: true,
    uppercase: true,
    special: true

})
// 得分
const scoreForPassword = computed(() => {
    return getScorePWD(complexPassword.value);
});
// 提示信息
let infoTip = ref("")

const getNewComplexPassword = () => {
    if (!Object.values(passwordElement).includes(true)) {
        infoTip = "至少勾选一项～";
        return
    }
    complexPassword.value = getPWD(passwordLength.value, passwordElement.number, passwordElement.lowercase, passwordElement.uppercase, passwordElement.special);
    infoTip.value=checkPWD(complexPassword.value)
};
</script>

<style scoped>
.code {
    margin: 0 2px;
    color: var(--color-text-2);
    background-color: var(--color-neutral-2);
    border: 1px solid var(--color-neutral-3);
    border-radius: 2px;
    font-size: 2rem;
    padding: 6px;
}
</style>