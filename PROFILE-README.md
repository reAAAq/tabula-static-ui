# My Student Profile 静态复刻

这是当前 My Student Profile / Identity 页面的一份独立纯静态复刻，包含原页面照片、资料字段、课程区、三级导航和页脚。

## 预览

运行 `npm run dev` 后打开 http://127.0.0.1:4174/profile.html。当前本地版本会先跳到登录演示，校验通过后返回资料页。

页面由静态 HTML、CSS、字体和图片组成，`auth.js` 处理本地演示会话检查与退出，没有数据接口。课程区采用原页面的 HTML `details` 元素，默认展开。该演示会话不提供真实数据保护。

点击 My Student Profile 打开 `profile.html`；点击左上角 Warwick 标识或 Tabula 标题返回 `index.html`。这些跳转通过原生 HTML 链接完成。

此前生成的 `tabula-static.zip` 包含登录改动前的首页、资料页和 Modules 页；`student-profile-static.zip` 是此前的单页独立版本。当前登录演示以工作目录及 GitHub Pages 发布版本为准。

原页面参照：`reference/profile-original.jpg`。复刻截图：`reference/profile-recreated.jpg`。
