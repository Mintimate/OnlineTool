<template>
  <div class="container mb-3">
    <div class="row pt-3">
      <div id="tittle" class="col-12 mt-2 mb-3 text-center">
        <h3>
          <strong>Markdown在线渲染</strong>
        </h3>
      </div>
    </div>
    <div class="row ">
        <div class="col-lg-3  justify-content-start">
          <div class="post-catalog catalog bg-white">
            <h5 class="catalog-title" style="padding: 0.5rem">目录</h5>
            <div style="padding-bottom: 0.5rem" class="catalog-detail">
            </div>
          </div>

        </div>
      <div class="post-main col-lg-9 col-sm-12 justify-content-start">
        <div class="bg-white row">
          <el-collapse v-model="activeNames" :accordion="false">
            <el-collapse-item title="Markdown文本" name="1">
              <v-md-editor
                  v-model="markdownText"
                  placeholder="哎呀，你都删完啦，快输入点Markdown进行渲染吧◡ ヽ(`Д´)ﾉ ┻━┻"
                  left-toolbar="undo redo clear | h bold italic strikethrough quote | ul ol table hr | link image code"
                  right-toolbar="" mode='edit' height="400px"></v-md-editor>
            </el-collapse-item>
            <el-collapse-item title="渲染文章" name="3">
              <div id="github-markdown-body" ref="markdownContent">
                <v-md-preview :text="markdownText"></v-md-preview>
              </div>
            </el-collapse-item>
          </el-collapse>
        </div>
      </div>
    </div>

  </div>

</template>

<script>
import tocbot from "tocbot";

export default {
  name: "markdownView",
  data() {
    return {
      catalog: "",
      activeNames: ["1","3"],
      markdownText: "# 关于\n" +
          "在此输入Markdown：\n" +
          "- `渲染目录`会根据本区块内标题内容，进行提取渲染。\n" +
          "- `渲染文章`会自动渲染本区块内Markdown为HTML内容。\n" +
          "\n" +
          "渲染代码：\n" +
          "```java\n" +
          "System.out.println(\"Mintimate's Blog(*≧ω≦)\");\n" +
          "```\n" +
          "\n" +
          "## 安全信息\n" +
          "页面加载后，将不再连接网站服务器，所有内容存储在本地`localStorage`内，不用担心自己隐私泄露。\n" +
          "\n" +
          "## 教程\n" +
          "如果你并不会使用Markdown语句，可以 参考教程：\n" +
          "- [Markdown菜鸟教程](https://www.runoob.com/markdown/md-tutorial.html)\n" +
          "\n" +
          "# 版权所有\n" +
          "- Mintimate's Blog：[https://www.mintimate.cn](https://www.mintimate.cn)\n" +
          "- Mintimate's Bilibili：[https://space.bilibili.com/355567627](https://space.bilibili.com/355567627)\n" +
          "## 感谢\n" +
          "- [Vue3](https://github.com/vuejs/vue-next)\n" +
          "- [Markdown渲染](https://github.com/code-farmer-i/vue-markdown-editor)\n" +
          "\n" +
          "![](/MarkdownDemo/DemoLog.jpg)",
    }
  },
  mounted() {
    if (localStorage.markdownText) {
      this.markdownText = localStorage.markdownText;
    }
    this.$nextTick(this.generatCatalog)
  },
  watch: {
    markdownText(markdownText) {
      localStorage.markdownText = markdownText;
      this.$nextTick(this.generatCatalog);
    }
  },
  destroyed() {
    tocbot.destroy();
  },
  methods: {
    generatCatalog() {
      // 生成目录
      // 保证渲染成功
        const article_content = this.$refs.markdownContent;
        const titleTag = ["H1", "H2", "H3"];
        console.log(article_content.children[0].childNodes)
        article_content.children[0].children[0].childNodes.forEach((e, index) => {
          if (titleTag.includes(e.nodeName)) {
            const id = "header-" + index;
            e.setAttribute("id", id);
          }
        });
        tocbot.init({
          tocSelector: ".catalog-detail", //要把目录添加元素位置，支持选择器
          contentSelector: "#github-markdown-body", //获取html的元素
          headingSelector: "H1, H2, H3", //要显示的id的目录
          onClick: function (e) {
            e.preventDefault();
          }
        });

    }
  }
}
</script>

<style scoped>
a{
  text-decoration:none;
}
.el-collapse-item {
  text-align: left;
}

.bg-white {
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.175);
  border-radius: 10px;
}

.post-catalog {
  list-style:none;
  top: 1rem;
  font-size: 0.85rem;
  position: sticky;
  height: 500px;
  overflow: scroll;
  overflow-x: hidden;
}
li a{
  color: #424242;
  text-decoration: none;
}


::-webkit-scrollbar {
  width: 0rem;
  height: .8rem;
}
.display-mobile{
  display: none;
}

@media screen and (max-width: 991px) {
  .post-catalog {
    display: none;
  }
  .display-mobile{
    display: revert;
  }
}
</style>
