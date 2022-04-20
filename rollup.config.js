import babel from '@rollup/plugin-babel';
import typescript from 'rollup-plugin-typescript2';

export default {
    input: './src/masonite-broadcast-client.ts',
    output: [
        { file: './dist/masonite-broadcast-client.js', format: 'esm' },
        { file: './dist/masonite-broadcast-client.common.js', format: 'cjs' },
        { file: './dist/masonite-broadcast-client.iife.js', format: 'iife', name: 'MasoniteBroadcastClient' },
    ],
    plugins: [
        typescript(),
        babel({
            babelHelpers: 'bundled',
            exclude: 'node_modules/**',
            extensions: ['.ts'],
            presets: ['@babel/preset-env'],
            plugins: [
                ['@babel/plugin-proposal-decorators', { legacy: true }],
                '@babel/plugin-proposal-function-sent',
                '@babel/plugin-proposal-export-namespace-from',
                '@babel/plugin-proposal-numeric-separator',
                '@babel/plugin-proposal-throw-expressions',
                '@babel/plugin-transform-object-assign',
            ],
        }),
    ],
};