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
        <select id="format" ref="format" class="form-select">
          <option value="None">保存原格式</option>
          <option value="PNG">PNG</option>
          <option value="JPG">JPG</option>
          <option value="WEBP">WEBP</option>
          <option value="BMP">BMP</option>
        </select>
      </div>
      <div class="form-group col-md-6 col-lg-3">
        <label for="compression" class="form-label">图片质量</label>
        <select id="compression" ref="compression" class="form-select">
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
        <select @change="changeMenu" id="mode" ref="mode" class="form-select">
          <option selected value="scale">等比例缩小</option>
          <option value="size">缩略图输出</option>
        </select>
      </div>
      <div class="form-group col-md-6 col-lg-3">
        <label for="modeDetail" id="modeDetailText" class="form-label">等比例缩小</label>
        <select id="modeDetail" ref="modeDetail" class="form-select">
          <option selected value="1f">原图尺寸</option>
          <option value="0.75f">原图75%</option>
          <option value="0.5f">原图50%</option>
          <option value="0.25f">原图25%</option>
        </select>
      </div>
    </div>
    <div class="row mt-3">
      <div class="col-12">
        <el-card>
          <el-upload
              ref="upload"
              class="upload-demo"
              drag
              limit="1"
              :data="uploadData"
              :before-upload="beforeUpload"
              :on-success="onSuccess"
              :on-error="onError"
              :auto-upload="false"
              list-type="picture"
              action="https://api.tool.mintimate.cn/processIMG/uploadImage"
              multiple>
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
            <div class="el-upload__tip pb-3" slot="tip">上传一张jpg/png/webp/bmp图片，且不超过10MB</div>
          </el-upload>
          <div class="d-grid gap-2">
            <el-button class="mt-2" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
          </div>
        </el-card>
      </div>
    </div>
    <el-card v-show="downloadState!=null">
      <div class="d-grid gap-2">
        <a :href="outPutIMGPath" class="btn btn-danger">{{ downloadState }}</a>
      </div>
    </el-card>
    <el-card  v-show="TypeList!=null">
      <div class="text-center alert-success col-12 mt-1 mb-3">
        AI图片识别分类(^з^)-☆<br>
        <strong>{{TypeList}}</strong>
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
      outPutIMGName:null,
      outPutIMGPath: null,
      downloadState: null,
      TypeList:null
    }
  },
  methods: {
    submitUpload() {
      this.$refs.upload.submit();
    },
    beforeUpload(file) {
      const enableType=['image/jpeg','image/webp','image/png','image/bmp']
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
        format: this.$refs.format.value,
        compression: this.$refs.compression.value,
        mode: this.$refs.mode.value,
        modeDetail: this.$refs.modeDetail.value,
      };
      console.log(this.uploadData);
      let promise = new Promise((resolve) => {
        this.$nextTick(function () {
          resolve(true);
        });
      });
      return promise; //通过返回一个promis对象解决
    },
    onSuccess(res) {
      this.$message("转码完成，快去下载吧～")
      this.outPutIMGName=res.thumbnailPath;
      this.outPutIMGPath="/dataApiPython/processIMG/download/"+res.thumbnailPath;
      this.downloadState = "点击下载"
      this.TypeList=res.imgType
    },
    onError(res){
      this.$message("嗷～出错了!!!请联系开发者……")
    },
    delIMG(){
      get("/dataApiPython/processIMG/delete/"+this.outPutIMGName)
          .then(res=>{
            this.$message("成功删除！！！")
          })
          .catch((res) => {  //失败的回调
            this.$message("删除失败，原因：文件已经被删除～")
          })
    },
    changeMenu(){
      if (this.$refs.mode.value=="size"){
        document.getElementById("modeDetail").innerHTML="<option value=\"1f\">中心100%</option> <option value=\"0.75f\">中心75%</option> <option value=\"0.5f\">中心50%</option>";
        document.getElementById("modeDetailText").innerText="缩略图输出";
      }
      else {
        document.getElementById("modeDetail").innerHTML="<option value=\"1f\">原图尺寸</option> <option value=\"0.75f\">原图75%</option> <option value=\"0.5f\">原图50%</option> <option value=\"0.25f\">原图25%</option";
        document.getElementById("modeDetailText").innerText="等比例缩小";
      }
    }
  }
}
</script>
<style>
.el-upload {
  display: inline;
}
.el-upload-list--picture .el-upload-list__item-thumbnail{
  height: 70px;
  width: auto;
}
.el-upload-list--picture .el-upload-list__item{
  background-color: var(--board-bg-color);
}
.el-upload-list--picture .el-upload-list__item-name{
  color: var(--text-color);
}
.el-upload-dragger {
  width: 100%;
  height: 100%;
}
.el-card__body{
  background-color: var(--card-color);
}
.el-upload-dragger{
  background-color: var(--card-color);
}
.el-upload__tip{
  color: var( --text-color);
}
.el-upload-dragger{
  height: 18em;
  display: inline-block;
}
.el-upload-dragger .el-upload__text {
  color: var( --text-color);
}
.el-upload-dragger .el-icon-upload{
  margin-top: 1.2em;
}
</style>
