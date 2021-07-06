## 适用于大多数情况下的nestJS基础框架搭建

```
--- src
    --- common 公共的常量、dto
    --- config 配置文件
    --- exceptions 自定义的异常类型
    --- filters 过滤器
    --- guards 守卫
    --- interfaces 公共的接口类型
    --- middlewares 中间件
    --- migrations 
    --- modules 模块
    --- providers 公共的服务
    --- app.module.ts 主模块
    --- main.ts 启动文件

```

### 1. eslintrc.js 配置

```
// 1. 首先保证项目中安装了eslint模块 & typescript模块

yarn add -D eslint typescript

// 2.  安装@typescript-eslint/parser 

yarn add -D  @typescript-eslint/parser

// 3. 安装@typescript-eslint/eslint-plugin

 yarn add -D @typescript-eslint/eslint-plugin

 // 4. 将如下内容添加至eslintrc.js
 {
  "parser": "@typescript-eslint/parser",
  "plugins": ["@typescript-eslint"],
  "rules": {
     "@typescript-eslint/rule-name": "error"
   }
 }

 // 5. 并开启我们所推荐的规则
 {
  "extends": ["plugin:@typescript-eslint/recommended"]
 }

 // 6.根据官方指示的规则,添加规则到rules中去
 rules: {
        '@typescript-eslint/interface-name-prefix': 'off',
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/ban-ts-comment': 'off',
        '@typescript-eslint/no-var-requires': 'off',
        '@typescript-eslint/no-unused-vars': 'off',
        '@typescript-eslint/no-empty-function': 'off',
    },

```

### prettiy的配置

1. 安装prettier以及eslint-config-prettier

```
yarn add -D prettier eslint-config-prettier
```

2.  安装eslint-plugin-prettier

```
yarn add -D eslint-plugin-prettier

```

3. 解决冲突

目前eslint规则和prettiy规则是会存在冲突的情况的

```
extends: ['plugin:@typescript-eslint/recommended', 'plugin:prettier/recommended']

// 等同于
{
  "extends": ["prettier"], // 启动eslint-config-prettier ,关闭跟prettier冲突的eslint规则
  "plugins": ["prettier"], // 在eslint中运行prettier的规则
  "rules": {
    "prettier/prettier": "error", // 运行prettier的规则
    "arrow-body-style": "off",
    "prefer-arrow-callback": "off"
  }
}

```

这样,如果没有特殊的需求,我们只需要增加eslint规则即可,prettier的规则会在eslint中运行









