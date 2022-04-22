<template>
  <div class="container pt-3">
    <div id="tittle" class="col-12 mt-2 mb-1 text-center">
      <span style="font-size: x-large;" class="text-center">
        <strong>图片压缩/转码</strong>
      </span><br/>
      <span style="font-size: xx-small">格式选择不恰当，文件越来越大哦( ；´Д｀)</span>
    </div>
    <div class="row">
      <div class="form-group col-md-6 col-lg-3">
        <label for="format" class="form-label">图片格式：</label>
        <select id="format" v-model="OutPut_IMG_Type" class="form-select">
          <option value="None">保存原格式</option>
          <option value="PNG">PNG</option>
          <option value="JPG">JPG</option>
          <option value="WEBP">WEBP</option>
          <option value="BMP">BMP</option>
        </select>
      </div>
      <div class="form-group col-md-6 col-lg-3">
        <label for="compression" class="form-label">图片质量</label>
        <select id="compression"
                v-model="IMG_Mode.compressionMode"
                class="form-select">
          <option value="1.0f">原图质量</option>
          <option value="1.2f">画质增强</option>
          <option value="0.8f">原图80%</option>
          <option value="0.6f">原图60%</option>
          <option value="0.4f">原图40%</option>
          <option value="0.2f">原图20%</option>
        </select>
      </div>
      <div class="form-group col-md-6 col-lg-3">
        <label for="mode" class="form-label">尺寸模式</label>
        <select
          id="mode"
          v-model="IMG_Mode.sizeMode"
          class="form-select">
          <option selected value="scale">等比例缩小</option>
          <option value="size">缩略图输出</option>
        </select>
      </div>
      <div class="form-group col-md-6 col-lg-3">
        <label for="modeDetail" id="modeDetailText" class="form-label">
          模式详情
        </label>
        <select id="modeDetail" v-model="IMG_Mode.sizeDetail" class="form-select">
          <option v-for="item in IMG_Mode.sizeDetailList" :key="item.value" :value="item.value">{{ item.text }}</option>
        </select>
      </div>
    </div>
    <div class="row mt-3">
      <div class="col-12">
        <el-card>
          <el-upload
            ref="upload"
            class="upload-demo"
            accept="image/jpeg,image/webp,image/png,image/bmp"
            drag
            :limit=1
            :on-exceed="handleExceed"
            multiple
            :data="uploadData"
            :before-upload="beforeUpload"
            :on-success="onSuccess"
            :on-error="onError"
            :auto-upload="false"
            list-type="picture"
            action="/dataApiJava/processIMG/uploadImage">

            <el-icon class="el-icon--upload pt-5">
              <upload-filled/>
            </el-icon>
            <div class="el-upload__text">
              将文件拖到此处，或<em>点击上传</em>
            </div>
            <div class="el-upload__tip">
              上传一张jpg/png/webp/bmp图片，且不超过10MB
            </div>
          </el-upload>
          <div class="d-grid gap-2">
            <el-button class="mt-2" type="success" @click="submitUpload">上传到服务器</el-button>
          </div>
        </el-card>
      </div>
    </div>
    <el-card v-show="downloadState!=null">
      <div class="d-grid gap-2">
        <a :href="'/dataApiJava/processIMG/download/'+resultIMG.outPutPathName" class="btn btn-danger">{{
            downloadState
          }}</a>
      </div>
    </el-card>
    <el-card v-show="resultIMG.imgType.length!=0">
      <div class="text-center alert-success col-12 mt-1 mb-3">
        AI图片识别分类(^з^)-☆<br>
        <strong>{{ resultIMG.imgType }}</strong>
        <br>服务器保存24小时后，图片将被自动删除。
        <a href="#" @click="delIMG">立即删除</a>
      </div>
    </el-card>
  </div>
</template>

<script>
import {get} from "../until/request";

export default {
  name: "processIMG",
  data() {
    return {
      uploadData: null,
      IMG_Mode: {
        compressionMode: "0.8f",
        sizeMode: "",
        sizeDetail: "1f",
        scaleDownText: [
          {value: "1f", text: "原图尺寸"}, {value: "0.75f", text: "原图75%"},
          {value: "0.5f", text: "原图50%"}, {value: "0.25f", text: "原图25%"},
        ],
        thumbnailText: [
          {value: "1f", text: "中心100%"}, {value: "0.75f", text: "中心75%"},
          {value: "0.5f", text: "中心50%"}
        ],
        sizeDetailList: [],
      },
      resultIMG: {
        imageName: "",
        outPutPathName: "",
        imgType: []
      },
      OutPut_IMG_Type: "None",
      downloadState: null,
    }
  },
  mounted() {
    this.IMG_Mode.sizeMode = "scale"
  },
  watch: {
    "IMG_Mode.sizeMode": function (newValue) {
      if (newValue == "scale") {
        this.IMG_Mode.sizeDetailList = this.IMG_Mode.scaleDownText
      } else {
        this.IMG_Mode.sizeDetailList = this.IMG_Mode.thumbnailText
      }
    }
  },
  methods: {
    handleExceed(files) {
      this.$refs.upload.clearFiles()
      this.$refs.upload.handleStart(files[0])
    },
    submitUpload() {
      this.$refs.upload.submit();
    },
    beforeUpload(file) {
      const enableType = ['image/jpeg', 'image/webp', 'image/png', 'image/bmp']
      const isAble = enableType.includes(file.type);
      const isLt10M = file.size / 1024 / 1024 < 10;

      if (!isAble) {
        this.$message.error('上传图片只能是 JPEG、PNG、BMP和WEBP格式!');
        return isAble;
      }
      if (!isLt10M) {
        this.$message.error('上传图片大小不能超过10MB!');
        return isLt10M
      }
      this.uploadData = {
        format: this.OutPut_IMG_Type,
        compression: this.IMG_Mode.compressionMode,
        mode: this.IMG_Mode.sizeMode,
        modeDetail: this.IMG_Mode.sizeDetail,
        file: file
      };
      let promise = new Promise((resolve) => {
        this.$nextTick(function () {
          resolve(true);
        });
      });
      return promise; //通过返回一个promis对象解决
    },
    onSuccess(res) {
      if (res.outPutPathName.length==0){
        this.$message("转码失败，可能是图片已经够清晰了～")
      }
      else{
        this.$message("转码完成，快去下载吧～")
        this.resultIMG = res
        this.downloadState = "点击下载"
      }
      console.log(res)
    },
    onError(res) {
      console.log(res)
      this.$message("嗷～出错了!!!请联系开发者……")
    },
    delIMG() {
      get("/dataApiJava/processIMG/delete/" + this.resultIMG.outPutPathName)
        .then(res => {
          console.log(res)
          if (res.data == "Success") {
            this.$message("成功删除！！！")
          } else {
            this.$message("删除失败：文件已经删除了嗷！！！")
          }
        })
    },
  }
}
</script>
<style>
.el-upload {
  display: inline;
}

.el-upload-list--picture .el-upload-list__item-thumbnail {
  height: 70px;
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
