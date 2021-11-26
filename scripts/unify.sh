#!/bin/bash

magenta=`tput setaf 5`
start_time=$(date +%s.%3N)

echo 'concatenating all ts files into compile.ts'

> uni/compile.ts

cat server/*ts >> uni/compile.ts

end_time=$(date +%s.%3N)
elapsed=$(echo "scale=3; $end_time - $start_time" | bc)
echo "${magenta}$(tput bold)Done in ${elapsed}ms" 