## 常用命令

```bash
# 安装数据库
brew install mysql

# 默认使用电脑密码(root password),修改密码
mysql_secure_installation

# ??? MySQL默认配置为仅允许来自localhost的连接,要连接运行==> 通过客户端连接
mysql -uroot

# ??? To have launchd start mysql now and restart at login:
brew services start mysql

# 查看数据库状态
mysql.server status

# 查看是否有mysqld进程（第三个数字）
ps -ef | grep mysqld 

# 所有的mysql进程
# USER     PID    %CPU  %MEM 
# _mysql   5970   0.0   0.4 ...
ps aux | grep mysql

# 杀掉进程
kill -9 进程号

# 通过终端进入mysql，默认的超级管理员root
mysql -u root -p

# 进入mysql命令行
# ??? Or, if you don't want/need a background service you can just run:
mysql -uroot

```

## 操作数据库常用指令(在mysql命令行里面输入，都要加分号)

```bash
# 启动数据库
sudo mysql.server start

# 停止数据库服务
sudo mysql.server stop

# 重启MySQL服务
sudo mysql.server restart

# 刷新权限
flush privileges

# 创建数据库
create database <数据库名>;

# 删除数据库
drop database <数据库名>;

# 查看当前数据库
select database();

# 选择数据库
use <数据库名>

# 创建数据表
create table 数据表名()

# 当前数据库包含的表信息：
mysql> show tables; （注意：最后有个s）

# 修改密码
 ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY'你的密码';
```

## 报错解决方法 

- MySql server startup error 'The server quit without updating PID file '
```bash
# 重新启动
sudo chown -R _mysql /usr/local/var/mysql

# 启动
sudo mysql.server start
```

- ERROR! MySQL is not running, but PID file exists / mutiple pid啥啥的
```bash
# 1. 查看所有mysql进程
ps aux | grep mysql

# 2. 手工杀掉所有进程
sudo kill <进程号1> <进程号2> 

# 3. 手动删掉以下文件
/usr/local/var/mysql/192.168.0.102.pid

# 2. 重新启动
sudo chown -R _mysql /usr/local/var/mysql

# 3. 启动(会重新生成pib文件)
sudo mysql.server status
```

- 新建用户报错 Operation CREATE USER failed for 'root'@'localhost'

```bash
# 刷新权限
flush privileges;
```
