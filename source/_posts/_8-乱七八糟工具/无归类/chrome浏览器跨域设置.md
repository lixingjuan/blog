## MAC Chrome浏览器跨域设置

```bash
# 1. 进去指定文件夹
cd /Users/lixingjuan/Documents/ 

# 2. 建立文件夹
mkdir MyChromeDevUserData

# 3. 打开浏览器并且增加参数
open -n /Applications/Google\ Chrome.app/ --args --disable-web-security --user-data-dir=/Users/lixingjuan/Documents/MyChromeDevUserData

```