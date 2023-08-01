import {defineNuxtPlugin} from "#app";
import { setup } from '@css-render/vue3-ssr';

export default defineNuxtPlugin((nuxtApp) => {
    const { collect } = setup(nuxtApp.vueApp);
    const originalRenderMeta = nuxtApp.ssrContext?.renderMeta;
    nuxtApp.ssrContext = nuxtApp.ssrContext || ({} as any);
    nuxtApp.ssrContext!.renderMeta = () => {
        if (!originalRenderMeta) {
            return {
                headTags: collect(),
            };
        }
        const originalMeta = originalRenderMeta();
        if ('then' in originalMeta) {
            return originalMeta.then((resolvedOriginalMeta) => {
                return {
                    ...resolvedOriginalMeta,
                    headTags: resolvedOriginalMeta.headTags + collect(),
                };
            });
        } else {
            return {
                ...originalMeta,
                headTags: originalMeta.headTags + collect(),
            };
        }
    };
});
