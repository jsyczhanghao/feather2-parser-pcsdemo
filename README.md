# feather2-parser-pcsdemo

##安装

`npm install [-g] feather2-parser-pcsdemo`

##使用
```
feather.match('**.{css,less}',{
    parser: feather.plugin('pcsdemo', {
        base: 50    //px转rem，基数50px
    })
})
```

```
feather2 release
```