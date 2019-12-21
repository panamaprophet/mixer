// import babel from 'rollup-plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import alias from '@rollup/plugin-alias';
import serve from 'rollup-plugin-serve';

export default {
    input: './src/index.js',
    output: {
        file: './dist/bundle.min.js',
        format: 'iife',
        name: 'bundle',
    },
    plugins: [
        resolve(),
        alias({
            entries: [
                { find: '/helpers', replacement: `${__dirname}/src/helpers` },
                { find: '/models', replacement: `${__dirname}/src/models` }, 
                { find: '/views', replacement: `${__dirname}/src/views` }, 
            ],
        }),
        serve('dist'),
    ],
}
