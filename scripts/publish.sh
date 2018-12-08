commit="$(git rev-parse --verify HEAD)"
echo "Commit: $commit"

mkdir temp
cp -r ./dist/ ./temp
cd temp
echo "www.recordbin.co" > CNAME
git init
git add .
git commit -m "$commit" --allow-empty
git remote add origin git@github.com:gtalarico/recordbin.co.git
git push -f origin master
cd ..
rm -rdf ./temp
