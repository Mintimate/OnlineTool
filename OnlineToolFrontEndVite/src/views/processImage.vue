<template>
  <div style="margin-top: 1rem" class="container">
    <a-row>
      <a-col id="tittle">
        <h1>图片压缩/转码</h1>
        <h5>格式选择不恰当，文件越来越大哦( ；´Д｀)</h5>
      </a-col>
    </a-row>
    <a-row :gutter="25" style="text-align: left;margin-top: 2rem">
      <a-col :xs="24" :lg="6">
        <a-form-item field="图片格式" label="图片格式">
          <a-select size="large" placeholder="请选择模式" v-model="genMode">
            <a-option value="None">保持原格式</a-option>
            <a-option value="PNG">PNG</a-option>
            <a-option value="JPG">JPG</a-option>
            <a-option value="WEBP">WEBP</a-option>
            <a-option value="BMP">BMP</a-option>
          </a-select>
        </a-form-item>
      </a-col>
      <a-col :xs="24" :lg="6">
        <a-form-item field="图片质量" label="图片质量">
          <a-select size="large" placeholder="请选择模式" v-model="genMode">
            <a-option value="1.0f">原图质量</a-option>
            <a-option value="0.8f">原图80%</a-option>
            <a-option value="0.6f">原图60%</a-option>
            <a-option value="0.4f">原图40%</a-option>
            <a-option value="0.2f">原图20%</a-option>
          </a-select>
        </a-form-item>
      </a-col>
      <a-col :xs="24" :lg="6">
        <a-form-item field="尺寸模式" label="尺寸模式 ">
          <a-select size="large">
          <option selected value="scale">等比例缩小</option>
          <option value="size">缩略图输出</option>
          </a-select>
        </a-form-item>
      </a-col>
      <a-col :xs="24" :lg="6">
        <a-form-item field="模式详情" label="尺寸模式 ">
          <a-input-number :style="{width:'100%'}" v-model="maxNum"
                          size="large" placeholder="仅支持数字" mode="button"/>
        </a-form-item>
      </a-col>
    </a-row>
    <a-row>
      <a-col>
        <a-upload draggable
                  :data="uploadData"
                  list-type="picture"
                  ref="uploadRef"
                  :limit="1"
                  :auto-upload="false"
                  :onSuccess="successProcessImage"
                  action="/api/processIMG/uploadImage" />
      </a-col>
    </a-row>
    <a-row>
      <a-col>
        <a-button long status="success" type="primary" @click="submitImage()">上传服务器转码</a-button>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import {get} from "@/until/request";
import {ref} from "vue";

export default {
  name: "processImage",
  setup(){
    const uploadRef = ref()
    let uploadData = {
      format: "",
      compression: "0.9f",
      mode: "Hello",
      modeDetail: "0.9f",
    };
    const submitImage = (e) => {
      console.log(uploadRef.value)
      uploadRef.value.submit();
    };
    function successProcessImage(resp){
      console.log(resp.response)
    }
    return {uploadRef,uploadData,
      submitImage,successProcessImage
    }
  },
}
</script>
<style>
.el-upload {
  display: inline;
}

.arco-upload-list-item-thumbnail {
  height: 80px;
  width: auto;
}

.el-upload-list--picture .el-upload-list__item {
  background-color: var(--board-bg-color);
}

.el-upload-list--picture .el-upload-list__item-name {
  color: var(--text-color);
}

.el-upload-dragger {
  width: 100%;
  height: 100%;
}

.el-card__body {
  background-color: var(--card-color);
}

.el-upload-dragger {
  background-color: var(--card-color);
}

.el-upload__tip {
  color: var(--text-color);
}

.el-upload-dragger {
  height: 18em;
  display: inline-block;
}

.el-upload-dragger .el-upload__text {
  color: var(--text-color);
}

.el-upload-dragger .el-icon-upload {
  margin-top: 1.2em;
}
</style>
