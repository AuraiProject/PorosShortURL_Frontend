#!/usr/bin/env bash

# Move the build file to django's folder.
# Put this project in the django project's root folder.

cd ./build;
mkdir ../../templates;
mv -f ./index.html ../../templates/index.html;
mv -t ./static ./*;
mv -f ./static/* ../../static;
mv -f ./static/js/* ../../static/js;
mv -f ./static/css/* ../../static/css;
cd ..;
rm -rf ./build;
