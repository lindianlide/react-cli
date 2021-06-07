fromBranch="Ft_Br"
toBranch="Dev_Br"
echo "输入commit描述: "
read commitDescription
# 首先拉取最新代码
git pull
echo '------------- 打包开始 -------------'
npm run build-cp

echo '------------- 打包结束 -------------'
echo '------------- 代码提交 -------------'
git add --all
git commit -m $commitDescription
git status
git pull origin $fromBranch
git push origin $fromBranch
echo '------------- 代码提交结束 -------------'
echo '---------------- 源分支合并到目标分支开始 ----------------'
cd ../
git checkout $toBranch
git pull
git merge --no-ff origin/$fromBranch
git push origin $toBranch
