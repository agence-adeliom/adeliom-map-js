let mix = require('laravel-mix');

mix
    .js('src/js/AdeliomMap.js', 'dist/js')
    .js('src/js/demo.js', 'dist/js')
    .sass('src/scss/AdeliomMap.scss', 'css')
    .sass('src/scss/demo.scss', 'css')
    .setPublicPath('dist');