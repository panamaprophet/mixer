import babel from 'rollup-plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import serve from 'rollup-plugin-serve';
import commonjs from '@rollup/plugin-commonjs';
import replace from '@rollup/plugin-replace';
import postcss from 'rollup-plugin-postcss';
import {terser} from 'rollup-plugin-terser';
import typescript from '@rollup/plugin-typescript';

import jsx from 'acorn-jsx';
import React from 'react';
import ReactDom from 'react-dom';


const ENVIRONMENT = process.env.NODE_ENV || 'development';


export default {
    input: 'src/index.tsx',
    output: {
        file: 'dist/bundle.min.js',
        format: 'iife',
        name: 'bundle',
    },
    acornInjectPlugins: [jsx()],
    plugins: [
        resolve(),
        postcss({
            extract: true,
            modules: true,
            minimize: true,
        }),
        commonjs({
            include: 'node_modules/**',
            namedExports: {
                react: Object.keys(React),
                'react-dom': Object.keys(ReactDom),
            },
        }),
        babel({
            babelrc: false,
            exclude: 'node_modules/**',
            presets: ['@babel/preset-react'],
        }),
        replace({
            'process.env.NODE_ENV': JSON.stringify(ENVIRONMENT),
        }),
        typescript(),
        terser(),
        serve('dist')
    ],
}