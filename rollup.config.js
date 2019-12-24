import babel from 'rollup-plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import alias from '@rollup/plugin-alias';
import serve from 'rollup-plugin-serve';
import commonjs from 'rollup-plugin-commonjs';
import replace from 'rollup-plugin-replace';
import postcss from 'rollup-plugin-postcss';

import React from 'react';
import ReactDom from 'react-dom';


export default {
    input: './src/index.js',
    output: {
        file: './dist/bundle.min.js',
        format: 'iife',
        name: 'bundle',
    },
    plugins: [
        resolve(),
        postcss({
            extract: true,
            modules: true, 
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
            'process.env.NODE_ENV': JSON.stringify('development'),
        }),
        alias({
            entries: [
                {
                    find: /^\/(.+)/,
                    replacement: `${__dirname}/src/$1`,
                },
            ],
        }),
        serve('dist'),
    ],
}
