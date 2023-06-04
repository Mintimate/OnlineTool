<template>
    <div style="margin-top: 1rem" class="container">
        <a-row>
            <a-col id="tittle">
                <h1> 日期在线计算</h1>
            </a-col>
        </a-row>
        <a-card style="text-align: left" title="参数">
            <a-form layout="horizontal"
                    size="large"
                    auto-label-width>
                <a-form-item field="beginLine" label="起始日期"
                             label-col-flex="5rem"
                             label-col-style="margin-right: 4.5rem">
                    <a-date-picker v-model="startDate" style="width: 15rem;"/>
                    <template #extra>
                        <div>起始日期，可以手动键盘输入，也可以用日历选择器选定嗷，默认为当天日期。</div>
                    </template>
                </a-form-item>
                <a-form-item field="endLine" label="截止日期" label-col-flex="5rem"
                             label-col-style="margin-right: 4.5rem">
                    <a-date-picker v-model="endDate" style="width: 15rem;"/>
                    <template #extra>
                        <div>截止日期，可以手动键盘输入，也可以用日历选择器选定嗷。</div>
                    </template>
                </a-form-item>
            </a-form>
        </a-card>
        <a-card style="text-align: left;margin-top: 1.5rem" title="操作">
            <a-form layout="horizontal"
                    size="large"
                    auto-label-width>
                <a-row :gutter="8">
                    <a-col :xs="24" :lg="12">
                        <a-form-item label-col-flex="0">
                            <a-input-number :style="{width:'100%'}"
                                            v-model="addDays"
                                            mode="button"
                                            size="large"
                                            placeholder="请输入数字(支持正负整数)" allow-clear>
                                <template #prefix>
                                    起始时间
                                </template>
                                <template #suffix>
                                    天后
                                </template>
                            </a-input-number>
                            <template #extra>
                                <div style="text-align: center">计算起始日期往前(后)N天的日。</div>
                            </template>
                            <a-button @click="addTheDays()" style="width: 10rem" status="success">确定</a-button>
                        </a-form-item>
                    </a-col>
                    <a-col :xs="24" :lg="12">
                        <a-form-item label-col-flex="0px"
                                     label-col-style="margin-right: 4.5rem">
                            <a-button @click="calculateTheDate()" type="primary" status="success" long>直接计算</a-button>
                            <template #extra>
                                <div>直接计算起始日期和截止日期之间相差多少天。</div>
                            </template>
                        </a-form-item>
                    </a-col>
                </a-row>
            </a-form>
        </a-card>
        <a-card style="text-align: left;margin-top: 1.5rem" title="输出结果">
            <a-typography-title v-html="dateResult" style="text-align: center" :heading="5"/>
        </a-card>
    </div>
</template>

<script setup>
import {onMounted, ref} from "vue";
import {DateDifference,addDate} from "@/until/calculateDateUtil.js"
import {Message} from "@arco-design/web-vue";
import {useHead} from "@unhead/vue";

useHead({
    title: "日期计算-在线工具箱",
    meta: [{
        name: "description",
        content: "在线计算两个日期间相隔几天、计算目标日期先后或向前推断几天后的日期",

    },
        {
            name: "keywords",
            content: "在线工具箱,开发者,几天后的日期,日期相隔几天"
        },
    ]
})

let dateResult = ref("等待用户操作");
let startDate = ref();
let endDate = ref();
let addDays = ref();
onMounted(() => {
    // 获取当天时间，作为默认开始时间
    startDate.value = new Date().Format("yyyy-MM-dd");
})

const calculateTheDate = ()=>{
    let days=DateDifference(startDate.value,endDate.value);
    if (isNaN(days)){
        Message.warning("玩坏啦!!!请检查参数嗷～")
    }
    else {
        dateResult.value = "距离截止日期还有：<span class='alert-important'>" + days + "天</span>嗷～"
    }
};
const addTheDays = ()=>{
    let days=addDays.value;
    let newDay=addDate(startDate.value,days);
    dateResult.value="起始日期后的<span class='alert-important'>"+days+"天</span>"+"是<span class='alert-important'>"+newDay+"</span>";

}
</script>

<style scoped>
:deep(.alert-important){
    color: #842029;
    background-color: #f8d7da;
    border-color: #f5c2c7;
}
</style>
