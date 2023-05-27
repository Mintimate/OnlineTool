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
          <a-select size="large" placeholder="请选择模式" v-model="uploadData.format">
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
          <a-select size="large" placeholder="请选择模式" v-model="uploadData.compression">
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
          <a-select size="large" v-model="uploadData.mode">
            <a-option selected value="scale">等比例缩小</a-option>
            <a-option value="size">缩略图输出</a-option>
          </a-select>
        </a-form-item>
      </a-col>
      <a-col :xs="24" :lg="6">
        <a-form-item field="尺寸模式" label="模式详情 ">
          <a-select size="large" v-model="uploadData.modeDetail">
            <a-option v-for="item in modeDetail.data" :key="item.value" :value="item.value">{{ item.text }}</a-option>
          </a-select>
        </a-form-item>
      </a-col>
    </a-row>
    <a-row>
      <a-col>
        <a-upload draggable
                  :fileItem="fileSource"
                  :data="uploadData"
                  list-type="picture"
                  ref="uploadRef"
                  :limit="1"
                  :auto-upload="false"
                  :onSuccess="successProcessImage"
                  action="/api/processIMG/uploadImage"/>
      </a-col>
    </a-row>
    <a-row>
      <a-col>
        <a-button :disabled="responseData.data.imageName.length"
          long status="success" type="primary" @click="submitImage()">上传服务器转码</a-button>
      </a-col>
    </a-row>
    <a-row v-if="responseData.data.imageName.length" style="margin-top: 0.75rem">
      <a-col :span="24">
        <a-alert type="success">
          <template #title>
            AI图片识别分类(^з^)-☆ <a-space>
            <a-tag v-for="item in responseData.data.imgType" :key="item" color="green">
              <template #icon><icon-star/></template>{{ item }}</a-tag>
            </a-space>
          </template>服务器保存24小时后，图片将被自动删除。
          <a-link status="danger" @click="delIMG()">立即删除</a-link>
          <a-link :href="'/api/processIMG/download/'+responseData.data.outPutPathName" >立即下载</a-link>
        </a-alert>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import {get} from "@/until/request";
import {reactive, ref, watch} from "vue";
import {Notification} from "@arco-design/web-vue";

export default {
  name: "processImage",
  setup() {
    const uploadRef = ref()
    const fileSource=ref()
    // 上传图片的选项
    let uploadData = reactive({
      format: "None",
      compression: "1.0f",
      mode: "scale",
      modeDetail: "1.0f",
    });
    // 图片处理好后的回调
    let responseData = reactive({data:{
        imageName: "",
        outPutPathName: "",
        imgType: []
      }
    });
    let modeDetail = reactive({data: [{value: "1.0f", text: "原图尺寸"}, {value: "0.75f", text: "原图75%"},
      {value: "0.5f", text: "原图50%"}, {value: "0.25f", text: "原图25%"}]})
    watch(uploadData, (newValue) => {
      if (newValue.mode == "scale") {
        modeDetail.data = [
          {value: "1.0f", text: "原图尺寸"}, {value: "0.75f", text: "原图75%"},
          {value: "0.5f", text: "原图50%"}, {value: "0.25f", text: "原图25%"}];
      } else {
        modeDetail.data = [
          {value: "1.0f", text: "中心100%"}, {value: "0.75f", text: "中心75%"}, {value: "0.5f", text: "中心50%"}];
      }
    })
    const submitImage = () => {
      uploadRef.value.submit();
    };

    /** 上传后的回调 */
    function successProcessImage(resp) {
      responseData.data = resp.response;
    }

    function delIMG() {
      responseData.data.imageName = '';
      get("/processIMG/delete/" + responseData.data.outPutPathName)
        .then(res => {
          if (res.data == "Success") {
            Notification.info({
              title: '删除成功',
            })
          } else {
            Notification.info({
              title: '删除失败',
              content: '不过文件还是会在24小时后销毁'
            })
          }
        })
    }

    return {
      uploadRef, uploadData, modeDetail, responseData,fileSource,
      submitImage, successProcessImage,delIMG
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
