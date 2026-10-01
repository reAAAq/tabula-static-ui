# Tabula 静态页面

按当前浏览器中已登录的 Tabula 首页制作，保留 Terrence Zhang、Hello, Terrence、四个功能入口、五条活动、活动展开内容及页脚原文。

`profile.html` 复刻 My Student Profile 资料页，保留原头像、资料字段、课程区、导航和页脚。首页的 My Student Profile 链接跳转到资料页；左上角的 Warwick 标识和 Tabula 标题返回首页。

`modules.html` 复刻当前 25/26 学年的 Modules 页，保留注册状态、年度汇总、进度说明、11 门课程、课程详情及考试表格。资料页的 Modules 链接打开此页；My Student Profile 和 u5593635 返回资料页，Warwick 标识和 Tabula 标题返回首页。

Modules 的课程总分、等级及各项考核成绩已按后来提供的七张截图修正，学年均分为 63.1%。

## 本地预览

```sh
npm run dev
```

打开 http://127.0.0.1:4174。也可以直接双击 `index.html`。

这是无需构建、无需安装依赖的静态网站，可将 `index.html`、`profile.html`、`modules.html`、`styles.css`、`app.js`、`modules.js` 和整个 `assets/` 目录复制到静态服务器。

## 文件

- `index.html`：页面结构和原文。
- `profile.html`：My Student Profile 资料页。
- `modules.html`：Modules 课程页。
- `modules.js`：已保存课程详情的本地展开、收起控制。
- `assets/`：本地保存的原站 CSS、Lato 字体、图标字体、Warwick 标识与背景。
- `styles.css`：本地补充样式。
- `app.js`：活动展开、收起和本地关闭操作。
- `reference/original.jpg`：原页面参照截图。
- `reference/recreated.jpg`：复刻页面截图。

所有页面资源均从本地加载。三页通过原生 HTML 链接互相跳转，资料页不含 JavaScript。其余入口保留文字与样式。关闭活动只影响当前浏览器页面，刷新后恢复。Modules 页的详情已包含在 HTML 中，展开时无需请求数据。

## GitHub Pages

此项目使用 `main` 分支的根目录发布。`.nojekyll` 让 GitHub Pages 直接提供静态文件，无需构建。页面链接和资源路径均为相对路径，可部署在仓库对应的子路径下。

`reference/` 中的核对截图和本地压缩包不提交到仓库。
