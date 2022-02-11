let mix = require('laravel-mix');

mix.js('src/js/AdeliomMap.js', 'dist/js')
    .sass('src/scss/AdeliomMap.scss', 'css')
    .setPublicPath('dist');