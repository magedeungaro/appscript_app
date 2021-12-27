#!/bin/bash

reset=`tput sgr0`
magenta=`tput setaf 5`
start_time=$(date +%s.%3N)
echo 'copying files from local to src...'

cp -a ./uni/*js ./src/
cp -a ./client/css/. ./src/
cp -a ./client/html/. ./src/
cp -a ./client/js/. ./src/

end_time=$(date +%s.%3N)
elapsed=$(echo "scale=3; $end_time - $start_time" | bc)
echo "${magenta}$(tput bold)Done in ${elapsed}ms ${reset}" 