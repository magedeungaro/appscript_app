#!/bin/bash

magenta=`tput setaf 5`
start_time=$(date +%s.%3N)

for FILE in ./client/html/*.html;
do 
  awk '{sub("&lt;","<")}1' $FILE > temp.txt && mv temp.txt $FILE
  awk '{sub("&gt;",">")}1' $FILE > temp.txt && mv temp.txt $FILE
done

end_time=$(date +%s.%3N)
elapsed=$(echo "scale=3; $end_time - $start_time" | bc)
echo "${magenta}$(tput bold)Done in ${elapsed}ms" 