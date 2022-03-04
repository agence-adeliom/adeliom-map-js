let mix = require('laravel-mix');

mix
    .ts('src/js/AdeliomMap.ts', 'dist/js')
    .ts('src/js/demo.js', 'dist/js')
    .sass('src/scss/AdeliomMap.scss', 'css')
    .sass('src/scss/demo.scss', 'css')
    .copyDirectory('src/img', 'dist/img')
    .setPublicPath('dist');