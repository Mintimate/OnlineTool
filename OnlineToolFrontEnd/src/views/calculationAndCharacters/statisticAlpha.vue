<template>
  <div class="container">
    <div class="row pt-3">
      <div id="tittle" class="col-12 mt-2 mb-1 text-center">
            <span style="font-size: x-large;">
              <strong>在线统计字数</strong>
            </span>
      </div>
      <div class="col-12 text-center">
          <textarea class="form-control" @input="statisticAlpha" placeholder="输入(或粘贴)统计字数的内容:" rows="12"
                    v-model="inputContent" autofocus></textarea>
      </div>
      <div class="col-12">
        <div class="card text-end border-0">
          <div class="card-body">
            <button v-if="notWork" class="btn btn-info me-2" disabled >Waiting</button>
            <button v-else class="btn btn-warning me-2" >Working</button>
            <button class="btn btn-danger " @click="cleanInput" >全部清空!
            </button>
          </div>

        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-6 col-sm-12">
        <div class="card" id="copyArea">
          <h5 class="card-header">共计：</h5>
          <div class="card-body">
            <span class="card-text">{{zishu}}</span>
            <span class="me-3 card-text">个字数</span>
            <span class="card-text">{{zifu}}</span>
            <span class="card-text">个字符</span>
          </div>
        </div>
      </div>
      <div class="col-md-6 col-sm-12">
        <div class="card">
          <h5 class="card-header">包含：</h5>
          <div class="card-body">
            <span>{{hanzi}}</span>
            <span class="me-3">个汉字</span>
            <span>{{biaodian}}</span>
            <span class="me-3">个标点(全角)</span>
            <span>{{zimu}}</span>
            <span class="me-3">个字母</span>
            <span>{{shuzi}}</span>
            <span>个数字</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {CountChineseCharacters} from "../../until/statisticAlpha.js"
export default {
  name: "statisticAlpha",
  data(){
    return{
      content:null,
      notWork:true,
      inputContent:null,
      zishu:0,
      zifu:0,
      hanzi:0,
      biaodian:0,
      zimu:0,
      shuzi:0
    }
  },
  components:{
    CountChineseCharacters,
  },
  methods:{
    statisticAlpha(){
      let Word=CountChineseCharacters(this.inputContent);
      this.hanzi=Word.hanzi;
      this.zishu=Word.zishu;
      this.biaodian=Word.biaodian;
      this.zimu=Word.zimu;
      this.shuzi=Word.shuzi;
      this.zifu=Word.zifu;
      this.zishu==0 ? this.notWork=true:this.notWork=false
    },
    cleanInput(){
      this.inputContente=null
      let Word=CountChineseCharacters(this.inputContent);
      this.hanzi=Word.hanzi;
      this.zishu=Word.zishu;
      this.biaodian=Word.biaodian;
      this.zimu=Word.zimu;
      this.shuzi=Word.shuzi;
      this.zifu=Word.zifu;
      this.notWork=true;
    }
  }
}
</script>

<style scoped>

</style>
