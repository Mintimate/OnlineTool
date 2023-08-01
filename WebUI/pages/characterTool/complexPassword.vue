<template>
    <div class="container text-center px-3 mx-auto">
        <div class="my-5">
            <h1 class="text-3xl">在线强密码生成</h1>
        </div>
        <UCard
            :ui="{ header: { padding: 'px-4 py-3 sm:px-3' } }"
            class="text-left"
        >
            <template v-slot:header>密码复杂度</template>
            <div class="grid grid-cols-1 gap-6">
                <UFormGroup
                    label="密码长度"
                    help="指定生成的密码的长度；通常，密码越长，密码强度越高，破解难度越大。"
                    required
                >
                    <USelect
                        v-model="passwordLength"
                        :options="passwordLengthOptions"
                        option-attribute="name"
                    />
                </UFormGroup>
                <UFormGroup
                    label="密码包含"
                    help="指定密码的组成规则，要求至少选择一项（推荐勾选2项以上）。"
                >
                    <div class="flex gap-4">
                        <UCheckbox
                            label="数字 0-9"
                            v-model="passwordElement.number"
                        />
                        <UCheckbox
                            label="小写字母 a-z"
                            v-model="passwordElement.lowercase"
                        />
                        <UCheckbox
                            label="大写字母 A-Z"
                            v-model="passwordElement.uppercase"
                        />
                        <UCheckbox
                            label="特殊字符"
                            v-model="passwordElement.special"
                        />
                    </div>
                </UFormGroup>
            </div>
        </UCard>
        <div class="my-6">
            <UButton @click="getNewComplexPassword()" block>生成强密码</UButton>
            <div class="text-center text-xs">
                <div>
                    此工具在您的设备上生成密码(客户端)
                    <br />
                    这些密码不会传送到我们的服务器
                </div>
            </div>
        </div>
        <UCard
            :ui="{ header: { padding: 'px-4 py-3 sm:px-3' } }"
            class="my-6 text-left"
        >
            <template v-slot:header>生成的密码</template>
            <div class="text-center my-3">
                <span class="code text-orange-500 bg-gray-200">{{ complexPassword }}</span>
                <span v-show="infoTip">
                    <UIcon
                        @click="copyComplexPassword()"
                        class="cursor-pointer"
                        name="i-ic-baseline-file-copy"
                    />
                </span>
                <div class="arco-form-item-extra" v-if="infoTip">
                    <a-rate v-model="scoreForPassword" readonly />
                    <UIcon
                        v-for="(item, index) in scoreForPassword"
                        :key="index"
                        name="i-ic-baseline-star"
                    />
                    <div>密码建议：{{ infoTip }}～</div>
                </div>
            </div>
        </UCard>
    </div>
</template>

<script setup>
import { computed, reactive, ref } from 'vue';
import { getPWD } from '~/untils/ComplexPassword.js';
import { checkPWD, getScorePWD } from '~/untils/CheckComplexPassword.js';

const toast = useToast();

useHead({
    title: '强密码生成-在线工具箱',
    meta: [
        {
            name: 'description',
            content:
                '纯前端生成强密码，分分钟编出一个没有逻辑的强密码，防止隐私泄漏',
        },
        {
            name: 'keywords',
            content: '在线工具箱,强密码,强密码生成,密码生成',
        },
    ],
});

const passwordLengthOptions = [
    {
        name: '8位密码',
        value: 8,
    },
    {
        name: '16位密码',
        value: 16,
    },
    {
        name: '32位密码',
        value: 32,
    },
    {
        name: '64位密码',
        value: 64,
    },
];

let complexPassword = ref('...等待用户操作...');
// 生成密码的长度
let passwordLength = ref(16);
// 密码组成
let passwordElement = reactive({
    number: true,
    lowercase: true,
    uppercase: true,
    special: true,
});
// 得分
const scoreForPassword = computed(() => {
    return getScorePWD(complexPassword.value);
});
// 提示信息
let infoTip = ref('');

const getNewComplexPassword = () => {
    if (!Object.values(passwordElement).includes(true)) {
        infoTip = '至少勾选一项～';
        return;
    }
    complexPassword.value = getPWD(
        passwordLength.value,
        passwordElement.number,
        passwordElement.lowercase,
        passwordElement.uppercase,
        passwordElement.special,
    );
    infoTip.value = checkPWD(complexPassword.value);
};

/** 复制生成的复杂密码 */
const copyComplexPassword = () => {
  const text = complexPassword.value;
  navigator.clipboard
      .writeText(text)
      .then(() => {
        toast.add({
          id: 'Module Error',
          title: '复制成功',
          description: '快去粘贴吧',
          icon: 'i-heroicons-face-smile-20-solid',
          timeout: 5000,
        });
      })
      .catch(() => {
        toast.add({
          id: 'Module Error',
          title: '复制失败',
          description: '请手动复制',
          icon: 'i-heroicons-face-frown-20-solid',
          timeout: 5000,
        });
      });
};
</script>

<style scoped>
.code {
    margin: 0 2px;
    border: 1px solid #cbcbcb;
    border-radius: 2px;
    font-size: 2rem;
    padding: 6px;
}
</style>
