import * as esbuild from 'esbuild';
import path from 'node:path';
const D = path.resolve('node_modules/shaders/dist');
await esbuild.build({
  entryPoints: ['src/hero-shader.js'], bundle: true, minify: true, format: 'esm', outfile: process.argv[2] || '../../hero-shader.js',
  legalComments: 'eof',
  plugins: [{ name: 'slim', setup(b) {
    b.onResolve({ filter: /^S\// }, a => ({ path: path.join(D, 'core/shaders', a.path.slice(2)) }));
    b.onResolve({ filter: /(registry|shaderRegistry-[^/]*)\.js$/ }, a => a.importer.includes('/core/shaders/') ? null : ({ path: 'stub', namespace: 'stub' }));
    b.onLoad({ filter: /.*/, namespace: 'stub' }, () => ({ contents: 'const t = () => []; const n = () => undefined; export { t, n, t as getAllShaders, n as getShaderByName, t as a, t as i, t as r };' }));
  }}],
});
