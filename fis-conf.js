/**
 * Created by rui on 2016/12/12.
 */
var static_path = '/rioParticleCanvas/';

//图片合并
fis.match('::package', {
    spriter: fis.plugin('csssprites')
});
// 对 CSS 进行图片合并
fis.match('*.css', {
    // 给匹配到的文件分配属性 `useSprite`
    useSprite: true
});
fis.match('*.js', {
    // fis-optimizer-uglify-js 插件进行压缩，已内置
    optimizer: fis.plugin('uglify-js')
});

fis.match('*.css', {
    // fis-optimizer-clean-css 插件进行压缩，已内置
    optimizer: fis.plugin('clean-css')
});
fis.match('*.png', {
    // fis-optimizer-png-compressor 插件进行压缩，已内置
    optimizer: fis.plugin('png-compressor')
});


fis.match('*', {
    release : static_path + '$0'
});
fis.match('::package', {
    postpackager: fis.plugin('loader', {
        allInOne: true

    })
});



fis.media('debug').match('*.{js,css,png}', {
    useHash: false,
    useSprite: false,
    optimizer: null
});
fis.media('debug').match('::package', {
    postpackager: fis.plugin('loader', {
        allInOne: false
    })
});
