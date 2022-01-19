import {createApp} from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// elements
import installElementPlus from './plugins/element'
//  Markdown
import VMdPreview from '@kangc/v-md-editor/lib/preview';
import VMdEditor from '@kangc/v-md-editor/lib/codemirror-editor';
import '@kangc/v-md-editor/lib/style/base-editor.css';
import '@kangc/v-md-editor/lib/style/preview.css';
import githubTheme from '@kangc/v-md-editor/lib/theme/github.js';
import '@kangc/v-md-editor/lib/theme/style/github.css';

// codemirror 编辑器的相关资源
import Codemirror from 'codemirror';
// mode
import 'codemirror/mode/markdown/markdown';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/css/css';
import 'codemirror/mode/htmlmixed/htmlmixed';
import 'codemirror/mode/vue/vue';
// edit
import 'codemirror/addon/edit/closebrackets';
import 'codemirror/addon/edit/closetag';
import 'codemirror/addon/edit/matchbrackets';
// placeholder
import 'codemirror/addon/display/placeholder';
// active-line
import 'codemirror/addon/selection/active-line';
// scrollbar
import 'codemirror/addon/scroll/simplescrollbars';
import 'codemirror/addon/scroll/simplescrollbars.css';
// style
import 'codemirror/lib/codemirror.css';

// highlightjs
import hljs from 'highlight.js';

// Vue-meta
import {createMetaManager} from "vue-meta";
import { useMeta } from 'vue-meta'

VMdPreview.use(githubTheme, {
    Hljs: hljs,
});
VMdEditor.Codemirror = Codemirror;

VMdEditor.use(githubTheme, {
    Hljs: hljs,
});
const app = createApp(App)
const metaManager = createMetaManager(false, {
    meta: { tag: 'meta', nameless: true },
});
installElementPlus(app)
app.use(store).use(router).use(VMdPreview).use(VMdEditor).use(metaManager,{refreshOnceOnNavigation:true})
app.mount('#app')
