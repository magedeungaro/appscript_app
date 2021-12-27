#!/bin/bash

reset=`tput sgr0`
magenta=`tput setaf 5`
start_time=$(date +%s.%3N)

> client/css/css.html

parcel build client/scss/style.scss

echo "<style>" > temp.txt

cat  temp.txt dist/style.css > client/css/css.html

> dist/style.css

cp client/css/css.html dist/style.css

echo "</style>" > temp.txt

cat  dist/style.css temp.txt  > client/css/css.html

cp dist/style.css temp.txt 

rm -r dist

end_time=$(date +%s.%3N)
elapsed=$(echo "scale=3; $end_time - $start_time" | bc)
echo "${magenta}$(tput bold)Done in ${elapsed}ms ${reset}" 