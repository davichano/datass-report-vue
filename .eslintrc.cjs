require("@rushstack/eslint-patch/modern-module-resolution")

module.exports = {
    root: true,
    extends: [
        'plugin:vue/vue3-essential',
        '@vue/eslint-config-airbnb',
        'plugin:prettier/recommended'
    ],
    plugins: ['prettier'],
    rules: {
        'prettier/prettier': 'error',
    },
}