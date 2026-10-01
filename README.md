# Tabula 静态页面

在线访问：[GitHub Pages](https://reaaaq.github.io/tabula-static-ui/)。源码仓库：[reAAAq/tabula-static-ui](https://github.com/reAAAq/tabula-static-ui)。

按当前浏览器中已登录的 Tabula 首页制作，保留 Terrence Zhang、Hello, Terrence、四个功能入口、五条活动、活动展开内容及页脚原文。

`profile.html` 复刻 My Student Profile 资料页，保留原头像、资料字段、课程区、导航和页脚。首页的 My Student Profile 链接跳转到资料页；左上角的 Warwick 标识和 Tabula 标题返回首页。

`modules.html` 复刻当前 25/26 学年的 Modules 页，保留注册状态、年度汇总、进度说明、11 门课程、课程详情及考试表格。资料页的 Modules 链接打开此页；My Student Profile 和 u5593635 返回资料页，Warwick 标识和 Tabula 标题返回首页。

Modules 的课程总分、等级及各项考核成绩已按后来提供的七张截图修正，学年均分为 63.1%。

`login.html` 参照已打开的登录页面制作背景、标识、用户名输入框、Next 按钮和页脚。用户名、密码分两步输入，使用浏览器内的固定演示账号校验；首页、资料页及 Modules 页会先检查当前标签页的演示会话。点击右上角姓名后可 Sign out。页面有静态演示标识，不连接学校认证系统，不发送或记录输入的账号密码。登录演示随当前版本发布到上述 GitHub Pages 地址。

## 本地预览

```sh
npm run dev
```

打开 http://127.0.0.1:4174，会先进入登录页。无论从哪个页面开始，登录成功后统一进入首页 `index.html`，再从首页进入资料或 Modules。请通过本地服务器预览，浏览器直接打开文件时的会话存储行为可能不同。

这是无需构建、无需安装依赖的静态网站。页面文件、CSS、JavaScript 和整个 `assets/` 目录构成完整本地版本。

## 文件

- `index.html`：页面结构和原文。
- `profile.html`：My Student Profile 资料页。
- `modules.html`：Modules 课程页。
- `login.html`、`login.css`、`login.js`：静态演示登录界面和两步输入交互。
- `auth.js`、`auth.css`：演示会话校验、退出和页面访问控制。
- `modules.js`：已保存课程详情的本地展开、收起控制。
- `assets/`：本地保存的原站 CSS、Lato 字体、图标字体、Warwick 标识与背景。
- `styles.css`：本地补充样式。
- `app.js`：活动展开、收起和本地关闭操作。
- `reference/original.jpg`：原页面参照截图。
- `reference/recreated.jpg`：复刻页面截图。

所有页面资源均从本地加载。三个内容页通过原生 HTML 链接互相跳转；其余入口保留文字与样式。关闭活动只影响当前浏览器页面，刷新后恢复。Modules 页的详情已包含在 HTML 中，展开时无需请求数据。

登录只用于演示页面跳转，不提供真实数据保护：固定用户名、密码散列和内容都存在静态文件中，会话标记可被修改。校验使用 Web Crypto 的 SHA-256，不在源码中保留明文密码。`sessionStorage` 仅保存登录标记，不保存用户名或密码。真实权限控制需要服务端认证。

## GitHub Pages

此项目使用 `main` 分支的根目录发布。`.nojekyll` 让 GitHub Pages 直接提供静态文件，无需构建。页面链接和资源路径均为相对路径，可部署在仓库对应的子路径下。

`reference/` 中的核对截图和本地压缩包不提交到仓库。
