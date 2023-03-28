<p align="center">
    <img alt="logo" src="https://img01.yzcdn.cn/vant/logo.png" width="120" height="120" style="margin-bottom: 10px;">
</p>

<h1 align="center">Vant</h1>

<p align="center">Mobile UI Components built on Vue</p>

<p align="center">
    <img src="https://img.shields.io/npm/v/vant.svg?style=flat-square" alt="npm version" />
    <img src="https://img.shields.io/github/workflow/status/vant-ui/vant/CI/dev?style=flat-square" alt="npm version" />
    <img src="https://img.shields.io/codecov/c/github/vant-ui/vant/dev.svg?style=flat-square&color=#4fc08d" alt="Coverage Status" />
    <img src="https://img.shields.io/npm/dm/vant.svg?style=flat-square&color=#4fc08d" alt="downloads" />
    <img src="https://img.shields.io/jsdelivr/npm/hm/vant?style=flat-square" alt="Jsdelivr Hits">
    <img src="https://img.badgesize.io/https://unpkg.com/vant/lib/vant.min.js?compression=gzip&style=flat-square&label=gzip%20size&color=#4fc08d" alt="Gzip Size" />
</p>

<p align="center">
  🔥 <a href="https://vant-contrib.gitee.io/vant">文档网站</a>
  &nbsp;
  &nbsp;
  🇨🇳 <a href="./README.zh-CN.md">中文版介绍</a>
  &nbsp;
  &nbsp;
  🚀 <a href="https://github.com/vant-ui/vant-weapp" target="_blank">小程序版</a>
</p>

---

## 使用方式

```bash
# 本地开发
npm run dev

# 预览
http://localhost:8080/#/zh-CN/

# 真机预览（同网段 ip）

http://192.168.1.3:8080/mobile.html#/zh-CN/popup

# 发版 v2 (gh-pages)
npm run release:site
```

## Features

- 🚀 1KB Component average size (min+gzip)
- 🚀 65+ High quality components
- 💪 90%+ Unit test coverage
- 💪 Written in TypeScript
- 📖 Extensive documentation and demos
- 📖 Provide Sketch and Axure design resources
- 🍭 Support Vue 2 & Vue 3
- 🍭 Support Tree Shaking
- 🍭 Support Custom Theme
- 🍭 Support i18n
- 🌍 Support SSR

## Install

```bash
# Install latest Vant for Vue 3 project
npm i vant -S

# Install Vant 2 for Vue 2 project
npm i vant@latest-v2 -S
```

## Quickstart

```js
import Vue from 'vue';
import { Button } from 'vant';
import 'vant/lib/index.css';

Vue.use(Button);
```

See more in [Quickstart](https://vant-ui.github.io/vant#/en-US/quickstart).

## Contribution

Please make sure to read the [Contributing Guide](./.github/CONTRIBUTING.md) before making a pull request.

## Browser Support

Vant 2 supports modern browsers and Android >= 4.0、iOS >= 8.0.

Vant 3 supports modern browsers and Chrome >= 51、iOS >= 10.0 (same as Vue 3).

## Official Ecosystem

| Project | Description |
| --- | --- |
| [vant-weapp](https://github.com/vant-ui/vant-weapp) | WeChat MiniProgram UI |
| [vant-demo](https://github.com/vant-ui/vant-demo) | Collection of Vant demos |
| [vant-cli](https://github.com/vant-ui/vant/tree/dev/packages/vant-cli) | Scaffold for UI library |
| [vant-icons](https://github.com/vant-ui/vant/tree/dev/packages/vant-icons) | Vant icons |
| [vant-touch-emulator](https://github.com/vant-ui/vant/tree/dev/packages/vant-touch-emulator) | Using vant in desktop browsers |

## Community Ecosystem

| Project | Description |
| --- | --- |
| [3lang3/react-vant](https://github.com/3lang3/react-vant) | React mobile UI Components based on Vant |
| [mxdi9i7/vant-react](https://github.com/mxdi9i7/vant-react) | Mobile UI Components built on React and TS, inspired by Vant |
| [vant-aliapp](https://github.com/ant-move/Vant-Aliapp) | Alipay MiniProgram UI |
| [taroify](https://gitee.com/mallfoundry/taroify) | Vant Taro |
| [vant-theme](https://github.com/Aisen60/vant-theme) | Online theme preview built on Vant UI |
| [@antmjs/vantui](https://github.com/antmjs/vantui) | Mobile UI Components based on Vant, supporting Taro and React |
| [@formily/vant](https://github.com/formilyjs/vant) | Form solution based on Vant and Formily |

## Links

- [Documentation](https://vant-ui.github.io/vant)
- [Changelog](https://vant-ui.github.io/vant#/en-US/changelog)
- [Gitter](https://gitter.im/vant-contrib/discuss?utm_source=share-link&utm_medium=link&utm_campaign=share-link)

## Preview

You can scan the following QR code to access the demo：

<img src="https://img01.yzcdn.cn/vant/preview_qrcode_20180528.png" width="220" height="220" >

## LICENSE

[MIT](https://en.wikipedia.org/wiki/MIT_License)
