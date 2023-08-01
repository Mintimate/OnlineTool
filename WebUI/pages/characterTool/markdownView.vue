<template>
    <div class="container text-center px-3 mx-auto">
        <div class="my-5">
            <h1 class="text-3xl">Markdown在线渲染</h1>
        </div>
        <div class="grid grid-cols-12 gap-2" :gutter="20">
            <div class="col-span-3">
                    <div
                        class="post-catalog catalog bg-white"
                        style="text-align: left"
                    >
                        <div
                            class="catalog-title mb-1 text-lg"
                        >
                            目录
                        </div>
                        <div
                            style="padding-bottom: 0.5rem"
                            class="catalog-detail"
                        ></div>
                    </div>
            </div>
            <div class="post-main lg:col-span-9 sm:col-span-12 col-span-12">
                <ClientOnly>
                    <v-md-editor
                        v-model="markdownText"
                        placeholder="哎呀，你都删完啦，快输入点Markdown进行渲染吧◡ ヽ(`Д´)ﾉ ┻━┻"
                        left-toolbar="undo redo clear | h bold italic strikethrough quote | ul ol table hr | link image code"
                        right-toolbar=""
                        mode="edit"
                        height="400px"
                    ></v-md-editor>
                </ClientOnly>
                <div
                    id="github-markdown-body"
                    ref="markdownGenerateContent"
                    style="text-align: left"
                >
                    <ClientOnly>
                        <v-md-preview :text="markdownText" />
                    </ClientOnly>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { nextTick, onMounted, ref, watch } from 'vue';
import tocbot from 'tocbot';

useHead({
    title: 'Markdown在线渲染-在线工具箱',
    meta: [
        {
            name: 'description',
            content:
                '在线渲染Markdown内容，在线使用Markdown配合mermaid画流程图。',
        },
        {
            name: 'keywords',
            content:
                '在线工具箱,Markdown在线渲染,Markdown画图,Markdown渲染,Markdown',
        },
    ],
});

let markdownText = ref(
    '# 关于\n' +
        '在此输入Markdown：\n' +
        '- `渲染目录`会根据本区块内标题内容，进行提取渲染。\n' +
        '- `渲染文章`会自动渲染本区块内Markdown为HTML内容。\n' +
        '\n' +
        '渲染代码：\n' +
        '```java\n' +
        'System.out.println("Mintimate\'s Blog(*≧ω≦)");\n' +
        '```\n' +
        '\n' +
        'mermaid渲染图：\n' +
        '```mermaid\n' +
        'flowchart LR\n' +
        '    Start --> Stop\n' +
        '```\n' +
        '\n' +
        '## 安全信息\n' +
        '页面加载后，将不再连接网站服务器，所有内容存储在本地`localStorage`内，不用担心自己隐私泄露。\n' +
        '\n' +
        '## 教程\n' +
        '如果你并不会使用Markdown语句，可以 参考教程：\n' +
        '- [Markdown菜鸟教程](https://www.runoob.com/markdown/md-tutorial.html)\n' +
        '\n' +
        '# 版权所有\n' +
        "- Mintimate's Blog：[https://www.mintimate.cn](https://www.mintimate.cn)\n" +
        "- Mintimate's Bilibili：[https://space.bilibili.com/355567627](https://space.bilibili.com/355567627)\n" +
        '## 感谢\n' +
        '- [Vue3](https://github.com/vuejs/vue-next)\n' +
        '- [Markdown渲染](https://github.com/code-farmer-i/vue-markdown-editor)\n' +
        '\n' +
        '![](/Demo/MarkdownDemo.jpg)',
);
let markdownGenerateContent = ref(null);
watch(markdownText, () => {
    generateCatalog();
});
onMounted(() => {
    nextTick(generateCatalog);
});

const generateCatalog = () => {
    // 生成目录
    const article_content = markdownGenerateContent.value;
    const titleTag = ['H1', 'H2', 'H3'];
    article_content.children[0].children[0].childNodes.forEach((e, index) => {
        if (titleTag.includes(e.nodeName)) {
            const id = 'header-' + index;
            e.setAttribute('id', id);
        }
    });
    tocbot.init({
        tocSelector: '.catalog-detail', //要把目录添加元素位置，支持选择器
        contentSelector: '#github-markdown-body', //获取html的元素
        headingSelector: 'H1, H2, H3', //要显示的id的目录
        orderedList: false,
        onClick: function (e) {
            e.preventDefault();
        },
    });
};
</script>

<style lang="less">
html.dark {
    .v-md-textarea-editor {
        textarea {
            // 样式规则
            color: rgb(var(--color-gray-50));
        }
    }
}

@media screen and (max-width: 991px) {
    .post-catalog {
        display: none;
    }

    .display-mobile {
        display: revert;
    }
}

.toc-list {
    padding: 0 10px;

    .toc-list-item {
        font-size: 1.1rem;
        line-height: 1.75;
        list-style: none;
    }

    .toc-link {
        display: block;
        border-left: 3px solid transparent;
        color: #666261 !important;
        transition: all 0.2s ease-in-out;
        text-decoration: none;
    }

    .is-active-link {
        border-left-color: #6238d5;
        background: #7957d5;
        color: #fff !important;
    }
}

.catalog {
    width: 100%;
    position: sticky;
    background-color: var(--color-bg-1);
    border-color: var(--color-bg-1);
    color: var(--color-text-1);
}

.catalog-title {
    display: flex;
    align-items: center;
    padding-left: 15px;
    line-height: 1.75;
}

.catalog-detail {
    padding: 10px 0px 10px;
}

.bg-white {
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.175);
    border-radius: 10px;
}

.post-catalog {
    top: 1rem;
    font-size: 0.85rem;
    position: sticky;
    height: 500px;
    overflow-x: hidden;

    li {
        list-style: none;
    }
}
</style>
