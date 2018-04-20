### 一些git操作命令的快捷方式,便于查询

1. 设置帐号密码
  - $ `git config --global user.name "Your Name"`
  - $ `git config --global user.email "email@example.com"`
2. 初始化一个Git仓库,使用 git init 命令。
  - $ `git init`
  - Initialized empty Git repository in /Users/michael/learngit/.git/
3. 添加文件到Git仓库,分两步:
  - 第一步,使用命令 `git add` ,注意,可反复多次使用,添加多个文件;
  - 第二步,使用命令 git commit ,完成。
    - $ `git add readme.txt`
    - $ `git commit -m "wrote a readme file"`
    - [master (root-commit) cb926e7] wrote a readme file
    - 1 file changed, 2 insertions(+)
    - create mode 100644 readme.txt
4. git status 告诉你是否有文件被修改过,用 git diff 可以查看修改内容。
  - $ `git status`
  - $ `git diff readme.txt`
5. git log 命令显示从最近到最远的提交日志,如果嫌输出信息太多,看得眼花缭乱的,可以试试加上--pretty=oneline 参数
  - $ `git log`
  - $ `git log --pretty=online`
6. 在Git中,用HEAD表示当前版本,也就是最新的提交“ 3628164...882e1e0”(注意我的提交ID和你的肯定不一样),上一个版本就是HEAD^,上上一个版本就是HEAD^^,当然往上100 个版本写100个^比较容易数不过来,所以写成HEAD~100
  - $ `git reset --hard HEAD^`
7. cat查看当前版本
  - $ `cat readme.txt`
8. Git提供了一个命令 git reflog 用来记录你的每一次命令:
  - $ `git reflog`
9. Git允许我们在版本的历史之间穿梭,使用命令 `git reset --hard commit_id`。
  - 穿梭前,用 `git log` 可以查看提交历史,以便确定要回退到哪个版本。
  - 要重返未来,用 `git reflog` 查看命令历史,以便确定要回到未来的哪个版本。
  - 工作区有一个隐藏目录“.git”,这个不算工作区,而是Git的版本库。
  - Git的版本库里存了很多东西,其中最重要的就是称为stage(或者叫index)的暂存区,还有Git为我们自动创建的第一个分支master,以及指向master的一个指针叫HEAD。
10. `git checkout -- file` 可以丢弃工作区的修改
  - $ `git checkout -- readme.txt` 命令 git checkout -- readme.txt 意思就是,把readme.txt文件在工作区的修改全部撤销,这里有两种情况: 
  - 一种是readme.txt自修改后还没有被放到暂存区,现在,撤销修改就回到和版本库一模一样的状态;
  - 一种是readme.txt已经添加到暂存区后,又作了修改,现在,撤销修改就回到添加到暂存区后的状态。
  - 总之,就是让这个文件回到最近一次 git commit 或 git add 时的状态。
11. 当你不断改乱了工作区某个文件的内容,还添加到了暂存区时,想丢弃修改,分两步,第一步用命令 `git reset HEAD file` ,就回到了想丢弃工作区的修改，再用命令`git checkout -- file`,丢弃工作区的修改
   - 如：$git reset HEAD readme.txt
   -  $git checkout -- readme.txt
12. 直接在文件管理器中把没用的文件删了,或者用 rm 命令删 
  $ `rm test.txt`
13. 命令 `git rm` 用于删除一个文件。如果一个文件已经被提交到版本库,那么你永远不用担心误删,但是要小心,你只能恢复文件到最新版本,你会丢失最近一次提交后你修改的内容。
14. 创建SSH Key
  $ `ssh-keygen -t rsa -C "youremail@example.com"` 
  - 你需要把邮件地址换成你自己的邮件地址,然后一路回车,使用默认值即可,由于这个Key也不是用于军事目的,所以也无需设置密码。
  - 如果一切顺利的话,可以在用户主目录里找到.ssh目录,里面有id_rsa和id_rsa.pub两个文件,这两个就是SSH Key的秘钥对,id_rsa是私钥,不能泄露出去,id_rsa.pub是公钥,可以放心地告诉任何人。
15. 在本地的learngit仓库下运行命令:
  - $ `git remote add origin git@github.com:designerbaby/learngit.git`
16. 把本地库的所有内容推送到远程库上:
  - $ `git push -u origin master`
17. Git鼓励大量使用分支： 
  - 查看分支：`git branch`
  - 创建分支：`git branch name`
  - 切换分支：`git checkout name`
  - 创建+切换分支：`git checkout -b name`
  - 合并某分支到当前分支：`git merge name`
  - 删除分支：`git branch -d name`
18. 查看远程库信息，使用`git remote -v;`
   - 本地新建的分支如果不推送到远程，对其他人就是不可见的；
   - 从本地推送分支，使用`git push origin branch-name`，如果推送失败，先用`git pull`抓取远程的新提交；
   - 在本地创建和远程分支对应的分支，使用`git checkout -b branch-name origin/branchname`，本地和远程分支的名称最好一致；
   - 建立本地分支和远程分支的关联，使用`git branch --set-upstream branch-name origin/branch-name`；
   - 从远程抓取分支，使用git pull，如果有冲突，要先处理冲突。
19. 命令`git tag name`用于新建一个标签，默认为HEAD，也可以指定一个commit id；
   - `-a tagname -m "blablabla..."`可以指定标签信息；
   - `-s tagname -m "blablabla..."`可以用PGP签名标签；
   - 命令`git tag`可以查看所有标签；
20. 命令`git push origin tagname`可以推送一个本地标签；
21. 命令`git push origin --tags`可以推送全部未推送过的本地标签；
22. 命令`git tag -d tagname`可以删除一个本地标签；
23. 命令`git push origin :refs/tags/tagname`可以删除一个远程标签。
24. 搭建Git服务器非常简单，通常10分钟即可完成；
   - 要方便管理公钥，用Gitosis；
   - 要像SVN那样变态地控制权限，用Gitolite。

 

只是简单列出了一些命令，需要详细知道怎么操作 ，建议还是去下载廖雪峰的git教程去看。