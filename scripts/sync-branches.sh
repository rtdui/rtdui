# 首先将master同步至最新
git checkout master
git pull

# master分支合并到dev分支
git checkout dev
git pull
git merge master
git push

# 将dev分支合并到其它分支
git checkout v5
git pull
git merge dev
git push