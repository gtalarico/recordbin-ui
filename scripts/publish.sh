commit="$(git rev-parse --verify HEAD)"
echo "Commit: $commit"

mkdir temp
cp -r ./dist/ ./temp
cd temp
echo "www.recordbin.co" > CNAME
echo "See [recordbin-ui](https://github.com/RecordBinCo/recordbin-ui)" > README.md
git init
git add .
git commit -m "$commit" --allow-empty
git remote add origin git@github.com:recordbinco/www.recordbin.co.git
git push -f origin master
cd ..
rm -rdf ./temp
