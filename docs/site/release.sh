#!/usr/bin/env sh
vant-cli build-site

# 发 v2 版本
gh-pages -d site --add --dest v2
