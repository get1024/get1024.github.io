---
title: Git 和 Github 的最佳实践
createAt: 2024-09-15 20:32:22
updateAt: 2025-06-24 15:08:04
tags:
  - Git
  - 教程
  - 指南
---

# Git 和 Github 的最佳实践

```dataview
TABLE createAt,updateAt
WHERE file = this.file
```

## 配置 `.gitignore`

### .gitignore 是干什么的？

`.gitignore` 文件用来声明一些**不需要被 Git 跟踪的文件**，比如： `node_modules` 、 `package-lock.json` 等等文件

### 如何配置？

- **放在项目根目录**：通常在项目根目录下创建一个名为 `.gitignore` 的文件。
- **子目录特殊需求**：如果某些子目录有不同的忽略规则，你也可以在对应子目录下再创建一个 `.gitignore`，规则只会对该目录及其子目录生效。

### 基本语法规则

|    规则    |              语法              |                示例                |                       说明                       |
| :------: | :--------------------------: | :------------------------------: | :--------------------------------------------: |
|    注释    |        以 `#` 开头，整行被忽略        |             `#这是注释`              |                                                |
|    空行    |                              |                                  |                用于分隔，增强可读性，不影响规则                |
| 通配符 `*`  |     `*` 匹配任意字符（不含 `/` ）      |             `*.log`              |                 忽略所有 `.log` 文件                 |
| 通配符 `?`  |     `?` 匹配单个字符（不含 `/` ）      |           `file?.txt`            | 忽略 `file1.txt` `fileA.txt` ，但不会忽略 `file10.txt` |
| 通配符 `**` |         `**` 递归进行匹配          |            `temp/**`             |               忽略 `temp` 目录下所有内容                |
|  `/` 开头  |          `/[path]`           |             `/build`             |     忽略本 `.gitignore` 文件所在目录下的 `build` 文件夹      |
|  `/` 结尾  |            `目录/`             |             `logs/`              |                  忽略 `logs` 目录                  |
|  `!` 取反  | `![匹配]` 取消之前的匹配，需要写在大范围的通配之后 |     `*.log`<br>`!import.log`     |       忽略除了 `import.log` 之外的所有 `.log` 文件        |
|    转义    |          `\!` `\#`           | `\!secret.txt`<br>`\#secret.txt` |              忽略以 `!` 或者 `#` 开头的文件              |

### 常见示例

```gitignore
# 操作系统生成的临时文件
.DS_Store
Thumbs.db

# IDE 或编辑器文件
.vscode/
*.suo
*.user

# 构建输出
/dist
/build

# 日志文件
*.log

# Node.js 依赖
node_modules/

# 环境变量配置
.env

# 取消忽略特定文件
!important.log
```

### 问题

在使用 `Git` 时，如果 `.gitignore` 文件配置正确，但某些文件或目录依然被 `Git` 跟踪并上传到远程仓库，这通常是因为这些文件在添加到 `.gitignore` **之前**已经被 `Git` 跟踪并提交过。即使后来在 `.gitignore` 中添加了这些文件的忽略规则， `Git` 依然会继续跟踪它们。

**_那么如何使 `.gitignore` 文件的规则对于那些已经被 track 的文件生效呢 ?_**{.marker-underline}

### 解决办法

要解决 `.gitignore` 失效的问题，需要通过以下步骤将已经被 Git 跟踪的文件从版本控制中移除，并确保这些文件在将来不会被再次跟踪。具体操作如下：

#### 更新 `.gitignore` 文件

编辑 `.gitignore` 文件，并确保将需要忽略的文件或目录添加到其中。例如，忽略某个目录或文件：

```gitignore [.gitignore]
# 忽略文件夹
folder_name/

# 忽略特定文件
file_name.txt
````

#### 从 Git 索引中移除文件

对于已经上传到 Git 仓库的文件，你需要将这些文件从 Git 的索引中移除，但保留它们在本地。使用以下命令：

```bash [git]
git rm --cached file_name.txt
```

如果是目录，可以使用：

```bash [git]
git rm -r --cached folder_name/
```

#### 提交更改

完成文件移除操作后，提交 `.gitignore` 的更改和文件从 Git 索引中移除的更改：

```bash [git]
git add .gitignore
git commit -m "Update .gitignore and remove files from tracking"
```

#### 推送更改

最后，将提交推送到远程仓库：

```bash [git]
git push origin branch_name
```

完成以上步骤后，Git 将不再跟踪 `.gitignore` 中列出的文件或目录，且这些文件不会再上传到远程仓库。

## 提交和同步

### 首次提交

欲把本地项目发布到 Github 仓库中，需要以下步骤：

1️⃣：首先需要新建一个 Repository；

2️⃣：在「本地仓库根目录」下打开 `Powershell` 或 `Command` ，**依次执行**以下命令：

  ```sh [powershell]
  git init			<-- 本地仓库 git 初始化
  git add .			<-- 添加所有变动到本次提交临时仓库中
  git commit -m "<your commit state>"			<-- 添加提交记录描述
  git remote add origin https://github.com/<username>/<repo-name>.git		<-- 链接远程仓库
  git push -u origin main			<-- 推动提交记录到远程仓库
  ```

### 版本更新

非首次提交就无需像上述那样麻烦了，只需要进行「提交和同步」即可，具体操作如下：

```sh [powershell]
git status			<-- 可选。用于查看与上次提交记录的更改变化

git add .			<-- 添加所有变动到本次提交临时仓库中
git commit -m "<your commit state>"			<-- 添加提交记录描述
git pull origin main			<-- 拉取远程仓库最新提交记录，并与本地分支合并
git push origin main			<-- 推送提交记录到远程仓库
```

由于我们需要多次使用，每次输入上述命令十分繁琐，为了加快工作效率，我们可以自定义 `git` 命令。

### 设置命令别名

语法

```sh [powershell]
git config --global alias.[别名] '[原git命令]'
```

具体使用

```sh [powershell]
git config --global alias.sb 'status -sb'
git config --global alias.cm 'commit -m'
git config --global alias.pl 'pull origin main'
git config --global alias.pu 'push origin main'
```

如果你有更多个性化需要，可以按照提供的语法格式，自行配置使用。

配置之后，使用效果如下：

```sh [powershell]
git sb

git add .
git cm "[message]"
git pl
git pu
```

不难发现，「提交和同步」变得十分简洁！

## Git-Commit 的规范编写

>[!DANGER]  我们为什么要规范 commit？
>多人协作项目、个人版本控制在进行 Git 提交时，都需要写 `commit message` ，否则 `git push origin main` 是不被允许的。
>
>一般来说， `commit message` 应该清晰明了，说明本次提交的目的，具体做了什么操作……
>
>但是在日常开发中，大家的 `commit message` 千奇百怪，中英文混合使用、`fix bug` 等各种笼统的 `message` 司空见怪，这就导致后续代码维护成本特别大，有时自己都不知道自己的 `fix bug` 修改的是什么问题。
>
>基于以上这些问题，本文希望通过某种方式来监控用户的 `git commit message`，让规范更好的服务于质量，提高大家的研发效率。

### 规范建设

一开始，我希望借助前人已经约定好的规范进行本文的内容基础，但在寻找了大量关于 `git commit -m [message]` 的资料后，学习、结合了 [Alibaba · 阿里巴巴](https://github.com/alibaba)、[高德地图](https://lbs.amap.com/)等相关部门已有的规范总结出以下规范。

#### Commit message 格式

```sh
<type>(<scope>):<subject>
```

### 字段含义

#### type

>[!warning] 必写项
>type 是 commit message 必须包含的内容，用于说明 git commit 的类别，只允许使用下面的标识。

- `feat` ：新功能（feature）。
- `fix/to` ：修复 bug，可以是 QA 发现的 BUG，也可以是研发自己发现的 BUG。
	- `fix` ：产生 diff 并自动修复此问题。适合于一次提交直接修复问题
	- `to` ：只产生 diff 不自动修复此问题。适合于多次提交。最终修复问题提交时使用 fix
- `docs` ：文档（documentation）。
- `style` ：格式（不影响代码运行的变动）。
- `refactor` ：重构（即不是新增功能，也不是修改 bug 的代码变动）。
- `perf` ：优化相关，比如提升性能、体验。
- `test` ：增加测试。
- `chore` ：构建过程或辅助工具的变动。
- `revert` ：回滚到上一个版本。
- `merge` ：代码合并。
- `sync` ：同步主线或分支的 Bug。

#### scope

>[!tip] 可选项
>scope 用于说明 commit 影响的范围，比如数据层、控制层、视图层等等，视项目不同而不同。

- 例如在 `Angular` ，可以是 `location` ， `browser` ， `compile` ， `rootScope` ， `ngHref` ， `ngClick` ， `ngView` 等。如果你的修改影响了不止一个 scope，你可以使用 `*` 号代替。

#### subject

>[!tip] 可选项
>subject 是 commit 目的的简短描述，不超过 50 个字符。

- 建议使用中文（感觉中国人用中文描述问题能更清楚一些）。
- 结尾不加句号或其他标点符号。

### 总结

根据以上规范 git commit message 将是如下的格式：

```sh [git]
fix(DAO):用户查询缺少username属性 
feat(Controller):用户查询接口开发
```

以上就是本文梳理的 `git commit` 规范，那么我们这样规范 `git commit` 到底有哪些好处呢？

- 便于程序员对提交历史进行追溯，了解发生了什么情况。
- 一旦约束了 `commit message` ，意味着我们将慎重的进行每一次提交，不能再一股脑的把各种各样的改动都放在一个 `git commit` 里面，这样一来整个代码改动的历史也将更加清晰。
- 格式化的 `commit message` 才可以用于自动化输出 `Change log` 。