import {defineNuxtPlugin} from "#app";
/** https://github.com/code-farmer-i/vue-markdown-editor */
import VueMarkdownEditor from '@kangc/v-md-editor';
import '@kangc/v-md-editor/lib/style/base-editor.css';
import vuepressTheme from '@kangc/v-md-editor/lib/theme/vuepress.js';
import '@kangc/v-md-editor/lib/theme/style/vuepress.css';
import Prism from 'prismjs';

// 预览Markdown
import VMdPreview from '@kangc/v-md-editor/lib/preview'
import '@kangc/v-md-editor/lib/style/preview.css';
import githubTheme from '@kangc/v-md-editor/lib/theme/github.js';
import '@kangc/v-md-editor/lib/theme/style/github.css';

// mermaid For Markdown
import createMermaidPlugin from '@kangc/v-md-editor/lib/plugins/mermaid/npm.js';
import '@kangc/v-md-editor/lib/plugins/mermaid/mermaid.css';

VueMarkdownEditor.use(vuepressTheme, {
    Prism,
});

// highlightjs
import hljs from 'highlight.js';


VMdPreview.use(githubTheme, {
    Hljs: hljs,
}).use(createMermaidPlugin());


export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.use(VueMarkdownEditor).use(VueMarkdownEditor).use(VMdPreview)
})
