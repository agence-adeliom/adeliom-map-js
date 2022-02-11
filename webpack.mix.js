let mix = require('laravel-mix');

mix.js('src/js/AdeliomMap.js', 'dist')
    .setPublicPath('dist');