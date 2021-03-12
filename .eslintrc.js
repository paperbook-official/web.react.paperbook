module.exports = {
    env: {
        browser: true,
        es2020: true
    },
    extends: [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:@typescript-eslint/recommended'
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaFeatures: {
            jsx: true
        },
        ecmaVersion: 11,
        sourceType: 'module'
    },
    plugins: ['import-helpers', 'react', '@typescript-eslint'],
    rules: {
        'import-helpers/order-imports': [
            'warn',
            {
                newlinesBetween: 'always',
                groups: [
                    '/^react/',
                    '/@/',
                    '/models/',
                    '/(services)|(api)/',
                    '/store/',
                    '/hooks/',
                    '/contexts/',
                    '/navigations/',
                    '/components/',
                    '/utils/',
                    '/assets/',
                    '/.scss/',
                    [('parent', 'sibling', 'index')]
                ],
                alphabetize: { order: 'asc', ignoreCase: true }
            }
        ]
    }
};
