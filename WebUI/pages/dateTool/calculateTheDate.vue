<template>
    <div class="container text-center px-3 mx-auto">
        <div class="my-5">
            <h1 class="text-3xl">日期在线计算</h1>
        </div>
        <UCard class="text-left">
            <template v-slot:header>参数</template>
            <div class="flex items-center">
                <span class="mr-3">起始日期:</span>
                <ClientOnly fallback-tag="span" fallback="Loading comments...">
                    <UPopover :popper="{ placement: 'bottom-start' }">
                        <UButton
                            size="sm"
                            icon="i-heroicons-calendar-days-20-solid"
                        >
                            <span class="text-sm">{{ dateStartLabel }}</span>
                        </UButton>
                        <template #panel="{ close }">
                            <VDatePicker dark borderless v-model="startDate" @close="close" />
                        </template>
                    </UPopover>
                </ClientOnly>
            </div>
            <div class="text-xs text-primary-500 mt-0.5">
                起始日期，可以手动键盘输入，也可以用日历选择器选定嗷，默认为当天日期。
            </div>
            <div class="flex items-center mt-5">
              <span class="mr-3">截止日期:</span>
              <ClientOnly fallback-tag="span" fallback="Loading comments...">
                    <UPopover :popper="{ placement: 'bottom-start' }">
                        <UButton
                            size="sm"
                            icon="i-heroicons-calendar-days-20-solid"
                        >
                            <span class="text-sm">{{ dateEndLabel }}</span>
                        </UButton>
                        <template #panel="{ close }">
                            <DatePicker v-model="endDate" @close="close" />
                        </template>
                    </UPopover>
                    <template #extra>
                        <div>
                            起始日期，可以手动键盘输入，也可以用日历选择器选定嗷，默认为当天日期。
                        </div>
                    </template>
                </ClientOnly>
            </div>
            <div class="text-xs text-primary-500 mt-0.5">
                起始日期，可以手动键盘输入，也可以用日历选择器选定嗷，默认为当天日期。
            </div>
        </UCard>
        <UCard class="text-left mt-5">
            <template v-slot:header>操作</template>
            <div class="grid grid-cols-12 gap-8">
                <div class="col-span-12 lg:col-span-6 sm:col-span-12">
                    <div class="grid grid-cols-12 gap-2">
                        <div class="col-span-10">
                          <UInput
                              size="lg"
                              type="number"
                              :ui="{ leading: { padding: { lg: 'ps-16' } } }"
                              v-model="addDays"
                              placeholder="请输入数字(支持正负整数)"
                          >
                            <template #leading>
                              <span class="text-xs">起始时间</span>
                            </template>
                            <template #trailing>
                              <span class="text-xs">天后</span>
                            </template>
                          </UInput>
                        </div>
                        <UButton class="col-span-2" block @click="addTheDays()">
                            确定
                        </UButton>
                    </div>
                    <div style="text-align: center">
                        计算起始日期往前(后)N天的日。
                    </div>
                </div>
                <div class="col-span-12 lg:col-span-6 sm:col-span-12">
                        <UButton
                            block
                            size="lg"
                            @click="calculateTheDate()"
                            type="primary"
                            status="success"
                            long
                        >
                            直接计算
                        </UButton>
                  <div style="text-align: center">
                    直接计算起始日期和截止日期之间相差多少天。
                  </div>
                </div>
            </div>
        </UCard>
        <UCard class="text-left mt-5">
            <template v-slot:header>输出结果</template>
            <div class="text-center" v-html="dateResult"></div>
        </UCard>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { DateDifference, addDate } from '~/untils/calculateDateUtil.js';
import { DatePicker } from 'v-calendar';

useHead({
    title: '日期计算-在线工具箱',
    meta: [
        {
            name: 'description',
            content:
                '在线计算两个日期间相隔几天、计算目标日期先后或向前推断几天后的日期',
        },
        {
            name: 'keywords',
            content: '在线工具箱,开发者,几天后的日期,日期相隔几天',
        },
    ],
});

let startDate = ref(new Date());
const dateStartLabel = computed(() =>
    startDate.value.toLocaleDateString('zh-CN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    }),
);

let endDate = ref(new Date());
const dateEndLabel = computed(() =>
    endDate.value.toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    }),
);

let dateResult = ref('等待用户操作');
let addDays = ref();

const calculateTheDate = () => {
    let days = DateDifference(startDate.value, endDate.value);
    if (isNaN(days)) {
        Message.warning('玩坏啦!!!请检查参数嗷～');
    } else {
        dateResult.value =
            "距离截止日期还有：<span class='alert-important'>" +
            days +
            '天</span>嗷～';
    }
};
const addTheDays = () => {
    let days = addDays.value;
    if (days == undefined){
      days =0
    }
    let newDay = addDate(startDate.value, days);
    dateResult.value =
        "起始日期后的<span class='alert-important'>" +
        days +
        '天</span>' +
        "是<span class='alert-important'>" +
        newDay +
        '</span>';
};
</script>

<style scoped>
:deep(.alert-important) {
    color: #842029;
    background-color: #f8d7da;
    border-color: #f5c2c7;
}
</style>
