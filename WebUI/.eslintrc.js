module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    extends: [
        'plugin:vue/vue3-recommended',
        'plugin:nuxt/recommended', // 针对nuxt3的校验规则
        '@vue/eslint-config-typescript',
        'plugin:prettier/recommended', // 防止prettier和eslint冲突
    ],
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
    },
    plugins: ['vue'],
    rules: {
        'vue/multi-word-component-names': 0, // 针对单个单词组件报错的规则关闭
    },
};
