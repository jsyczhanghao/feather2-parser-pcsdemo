var Postcss = require('postcss');
var CSS3_PROPS = ['transform', 'transition', 'border-radius', 'box-shadow'];
var BROWSERS = ['ms', 'webkit', 'moz', 'o'];

var Plugin = Postcss.plugin('myplugin', function myplugin(options) {
    return function (css, options) {   
        var base = options.opts.base;

        //遍历规则，规则就是#main{}这么个玩意
        css.walkRules(function(rule){
            var css3 = [];

            //遍历属性声明，就是 font-size: 12px 这么个玩意
            rule.walkDecls(function (decl, i) {
                decl.value = decl.value.replace(/(\d+)px/g, function(all, num){
                    return Number(num)/base + 'rem';
                });

                if(CSS3_PROPS.indexOf(decl.prop) > -1){
                    BROWSERS.forEach(function(browser){
                        var newNode = decl.clone({
                            prop: '-' + browser + '-' + decl.prop
                        });

                        rule.insertAfter(i, newNode);
                    });
                }
            });
        });
    }
});

var instance = Postcss([Plugin]);

module.exports = function(content, file, options){
    content = instance.process(content, options).css;
    return content;
};