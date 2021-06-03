#!/usr/bin/env sh
###
 # @Author: your name
 # @Date: 2021-06-03 10:46:20
 # @LastEditTime: 2021-06-03 11:09:59
 # @LastEditors: Please set LastEditors
 # @Description: In User Settings Edit
 # @FilePath: \supplier\deploy.sh
### 

# 发生错误时终止
set -e

# 构建
npm run build:test

# 保存并代码到远程仓库
git init
git add -A
git commit -m 'deploy'
git push -f git@github.com:sugusgeekery/sugusgeekery.github.io.git test:test

# 进入构建文件夹
cd supplier

# 如果你要部署在 https://sugusgeekery.github.io
git push -f git@github.com:sugusgeekery/sugusgeekery.github.io.git test:gh-pages

cd -