import babel from 'rollup-plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import alias from '@rollup/plugin-alias';
import serve from 'rollup-plugin-serve';
import commonjs from 'rollup-plugin-commonjs';
import replace from 'rollup-plugin-replace';

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
                { find: '/helpers', replacement: `${__dirname}/src/helpers` },
                { find: '/models', replacement: `${__dirname}/src/models` }, 
                { find: '/views', replacement: `${__dirname}/src/views` }, 
                { find: '/components', replacement: `${__dirname}/src/components` },
                { find: '/sources', replacement: `${__dirname}/src/sources` },
            ],
        }),
        serve('dist'),
    ],
}
