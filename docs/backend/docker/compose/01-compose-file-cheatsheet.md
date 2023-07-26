---
sidebar_position: 1
---

# compose 文件的小抄

这里是 Docker Compose 配置文件中的常用字段

### services:

| 字段 | 描述 |
| ---- | ---- |
| image | 指定镜像 |
| command | 执行命令，覆盖容器启动后默认执行的命令（类似于 `docker run`） |
| container_name | 指定容器名称，由于容器名称是唯一的，如果指定自定义名称，则无法 `scale` 指定容器数量（同一个镜像指定多个容器数量） |
| environment | 添加环境变量 |
| hostname | 容器主机名 |
| ports | 暴露容器端口，与 `-p` 相同，但端口不能低于 60 |
| volumes | 挂载一个宿主机目录或命令卷到容器中 |
| restart | 重启策略：`never`，`always`，`no-failure:${重试次数}`，`unless-stopped` |
| depends_on | 在依赖的服务之后启动 |


<!-- build	使用 Dockerfile 构建镜像。指定Dockerfile 文件名，要指定Dockerfile文件需要在build标签的子级标签中使用dockerfile标签指定
dockerfile	构建镜像上下文路径（指定Dockerfile文件）
context	可以是 dockerfile 的路径，或者是指向git 仓库的url地址
deploy	指定部署和运行服务相关的配置，只能在Swarm模式使用
networks	加入网络，引用顶级networks下条目
networks_mode	设置容器的网络模式，如 host，bridge
volumes_from	从另一个服务或容器挂载卷，可选参数:ro 和:rw。仅版本’2’ 支持
hostname	容器主机名
sysctls	在容器内设置内核参数
links	连接到另外一个容器，- 服务名称[:服务别名] （类似于容器互联）
privileged	用来给容器root权限，注意是不安全的，只有两个值：true或false -->
