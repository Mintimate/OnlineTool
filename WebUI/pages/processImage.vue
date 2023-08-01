<template>
    <div class="container text-center px-3 mx-auto">
        <div class="my-5">
            <h1 class="text-3xl">图片压缩/转码</h1>
            <p class="text-sm">格式选择不恰当，文件越来越大哦( ；´Д｀)</p>
        </div>
        <div class="grid grid-cols-12 gap-8 text-left mt-2">
            <div class="col-span-12 lg:col-span-3">
                <UFormGroup label="图片格式">
                    <USelect
                        v-model="uploadData.format"
                        placeholder="请选择模式"
                        :options="[
                            { name: '保持原格式', value: 'None' },
                            { name: 'PNG', value: 'PNG' },
                            { name: 'JPG', value: 'JPG' },
                            { name: 'WEBP', value: 'WEBP' },
                            { name: 'BMP', value: 'BMP' },
                        ]"
                        option-attribute="name"
                        icon="i-ic-baseline-format-paint"
                    />
                </UFormGroup>
            </div>
            <div class="col-span-12 lg:col-span-3">
                <UFormGroup label="图片质量">
                    <USelect
                        v-model="uploadData.compression"
                        placeholder="请选择模式"
                        :options="[
                            { name: '原图质量', value: '1.0f' },
                            { name: '原图80%', value: '0.8f' },
                            { name: '原图60%', value: '0.6f' },
                            { name: '原图40%', value: '0.4f' },
                            { name: '原图20%', value: '0.2f' },
                        ]"
                        option-attribute="name"
                        icon="i-ic-baseline-high-quality"
                    />
                </UFormGroup>
            </div>
            <div class="col-span-12 lg:col-span-3">
                <UFormGroup label="尺寸模式">
                    <USelect
                        v-model="uploadData.mode"
                        placeholder="请选择模式"
                        :options="[
                            { name: '等比例缩小', value: 'scale' },
                            { name: '缩略图输出', value: 'size' },
                        ]"
                        option-attribute="name"
                        icon="i-ic-baseline-photo-size-select-large"
                    />
                </UFormGroup>
            </div>
            <div class="col-span-12 lg:col-span-3">
                <UFormGroup label="模式详情">
                    <USelect
                        v-model="uploadData.modeDetail"
                        placeholder="请选择模式"
                        :options="modeDetail.data"
                        option-attribute="text"
                        icon="i-ic-round-edit-location-alt"
                    />
                </UFormGroup>
            </div>
        </div>
        <div class="grid grid-cols-1 p-3">
          <ClientOnly>
            <n-upload
                list-type="image"
                ref="uploadRef"
                :multiple="false"
                directory-dnd
                :data="uploadData"
                :default-upload="false"
                @finish="successProcessImage"
                action="/api_v1/processIMG/uploadImage"
                :max="1"
            >
                <n-upload-dragger>
                    <div class="mt-6">
                        <UIcon
                            class="text-3xl"
                            name="i-ic-baseline-cloud-upload"
                        />
                    </div>
                    <span class="text-lg">点击或者拖动文件到该区域来上传</span>
                    <div
                        class="text-sm m-3 items-center flex justify-center"
                    >
                        <UIcon name="i-ic-round-warning" />
                        本网站不会存储用户信息，但是也请警惕当前网络环境是否安全
                    </div>
                </n-upload-dragger>
            </n-upload>
          </ClientOnly>
        </div>
        <div class="grid grid-cols-1">
            <div>
                <UButton
                    :disabled="responseData.data.imageName.length"
                    block
                    @click="submitImage()"
                >
                    上传服务器转码
                </UButton>
            </div>
        </div>
        <div
            class="grid grid-cols-1 mt-4"
            v-if="responseData.data.imageName.length"
            style="margin-top: 0.75rem"
        >
            <div class="text-sm">
                AI图片识别分类(^з^)-☆
                <div>
                    <UBadge
                        v-for="item in responseData.data.imgType"
                        :key="item"
                        :label="item"
                    />
                </div>
                服务器保存24小时后，图片将被自动删除。
                <a class="cursor-pointer text-orange" @click="delIMG()">立即删除</a>
                <a
                    class="text-blue"
                    :href="
                        '/api/processIMG/download/' +
                        responseData.data.outPutPathName
                    "
                >
                    立即下载
                </a>
            </div>
        </div>
    </div>
</template>

<script setup>
import { get } from '~/untils/request';
import { reactive, ref, watch } from 'vue';

useHead({
    title: '在线处理图片-By Mintimate',
    meta: [
        {
            name: 'description',
            content: '在线转码图片，PNG转JPG、JPG转WEBP等',
        },
        {
            name: 'keywords',
            content: '在线工具箱,转码图片,图片转码,WEBP转码',
        },
    ],
});

const uploadRef = ref();
const fileSource = ref();
// 上传图片的选项
let uploadData = reactive({
    format: 'None',
    compression: '1.0f',
    mode: 'scale',
    modeDetail: '1.0f',
});
// 图片处理好后的回调
let responseData = reactive({
    data: {
        imageName: '',
        outPutPathName: '',
        imgType: [],
    },
});
let modeDetail = reactive({
    data: [
        { value: '1.0f', text: '原图尺寸' },
        { value: '0.75f', text: '原图75%' },
        { value: '0.5f', text: '原图50%' },
        { value: '0.25f', text: '原图25%' },
    ],
});
watch(uploadData, (newValue) => {
    if (newValue.mode === 'scale') {
        modeDetail.data = [
            { value: '1.0f', text: '原图尺寸' },
            { value: '0.75f', text: '原图75%' },
            { value: '0.5f', text: '原图50%' },
            { value: '0.25f', text: '原图25%' },
        ];
    } else {
        modeDetail.data = [
            { value: '1.0f', text: '中心100%' },
            { value: '0.75f', text: '中心75%' },
            { value: '0.5f', text: '中心50%' },
        ];
    }
});

/** 上传方法 */
const submitImage = () => {
    uploadRef.value.submit();
};

/** 上传后的回调 */
const successProcessImage = (content) => {
    const { event } = content;
    const xhr = event.target;
    const responseBody = xhr.response;
    responseData.data = JSON.parse(responseBody);
};

/** 上传失败 */
const handleError = () => {
    console.log('发生了错误');
};

/** 文件超出 */
const handleExceed = (files) => {
    console.log('handleExceed');
    uploadRef.value.clearFiles();
    const file = files[0];
    file.uid = genFileId();
    uploadRef.value.handleStart(file);
};

const delIMG = () => {
    responseData.data.imageName = '';
    get('/processIMG/delete/' + responseData.data.outPutPathName).then(
        (res) => {
            if (res.data == 'Success') {
                Notification.info({
                    title: '删除成功',
                });
            } else {
                Notification.info({
                    title: '删除失败',
                    content: '不过文件还是会在24小时后销毁',
                });
            }
        },
    );
};
</script>
<style lang="less">
.n-upload-file-info {
    img {
        width: auto;
    }
}

html.dark {
    .n-upload-dragger {
        background-color: rgb(30 41 59 / var(--tw-bg-opacity));
    }
}

.n-upload-trigger .n-upload-dragger {
    height: 15rem;
}
</style>
