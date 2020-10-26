const is_prod = process.env.NODE_ENV === 'production'

module.exports = {
    root: true,
    env: {
        node: true,
        es6: true
    },
    extends: [
        'plugin:vue/vue3-essential',
        'eslint:recommended'
    ],
    rules: {
        'no-console': is_prod ? 'warn' : 'off',
        'no-debugger': is_prod ? 'warn' : 'off',
        'no-unused-vars': [
            'error',
            {
                varsIgnorePattern: '^_',
                argsIgnorePattern: '^_',
                caughtErrorsIgnorePattern: '^_'
            }
        ],
        quotes: ['error', 'single'],
        semi: 'error'
    },
    parserOptions: {
        ecmaFeatures: {
            experimentalObjectRestSpread: true
        },
        sourceType: 'module'
    }
}
