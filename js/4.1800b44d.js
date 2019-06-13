(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{397:function(n,o){n.exports="\x3c!--\ntitle: 快速开始 \nsort: 1\n--\x3e\n\nRDoc 是一套基于基于 [Webpack](https://webpack.js.org/)，[React](https://reactjs.org/)，[React Router](https://reacttraining.com/react-router/web/guides/philosophy) 封装的文档生成工具，用于生成React组件库文档或博客网站，\n\n> 在开始之前，推荐先学习 Markdown语法，并正确安装和配置了 [Node.js](https://nodejs.org) v8.0 或以上。\n\n下面教程，是最快速开始生成一个文档网站。你也可以通过 `入门` 一步一步配置一个初始工程。\n\n1. 全局安装\n\n```shell\n$ npm install rdoc -g # 安装工具\n## /usr/local/bin/rdoc -> /usr/local/lib/node_modules/rdoc/.bin/rdoc.js\n## /usr/local/bin/rdoc-cli -> /usr/local/lib/node_modules/rdoc/.bin/rdoc.js\n```\n\n2. 初始化工程\n\n可以通过一条命令生成，一个初始文档网站工程。初始化工程，里面会包含一个 `package.json`，`rdoc` 工具会被当做依赖放入其中，避免 `rdoc` 工具升级带来的问题。\n\n```shell\n$ rdoc init my-project # 初始化项目\n## or\n$ rdoc-cli init my-project\n## 也可以使用 rdoc-cli 命令，跟 rdoc 命令是一样的\n## 增加 用 rdoc-cli 命令，目的是解决 Mac 系统自带的 Ruby 命令 rdoc 冲突\n```\n\n3. 运行网站\n\n初始化工程，其实就是 `rdoc` 工具的文档，里面 Markdown 都是写好的，直接运行下面命令，可看效果\n\n```shell\n$ cd my-project  # 进入初始化的工程目录\n$ npm install    # 安装依赖，这里依赖了 rdoc 版本，避免 rdoc 升级带来的问题。\n$ npm start      # 启动服务\n\n## Compiled successfully!\n## \n## You can now view rdoc in the browser.\n## \n##   Local:            http://localhost:5858/\n##   On Your Network:  http://192.168.188.109:5858/\n## Note that the development build is not optimized.\n## To create a production build, use npm run build.\n```\n\n会自动打开网站，同时命令行会提示你，打开的网址，这样你就可以开始写 Markdown 了，并且可以实时预览你的网站。\n"}}]);