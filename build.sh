export NODE_ENV production

if [ -d "dist" ];then
  rm -rf dist
fi

mkdir dist
npm run babel-src
cp src/package.json dist/
cp .npmignore dist/
cp README.md dist/