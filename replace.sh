#!/bin/bash

#script para substituir as server side tags do appscript (.gs)
# # Checar se o parâmetro (arquivo) existe
# if [ $1 != "" ]; then
# # Mudar &lt; para < e &gt; para >
# awk '{sub("&lt;","<")}1' $1 > temp.txt && mv temp.txt $1
# awk '{sub("&gt;",">")}1' $1 > temp.txt && mv temp.txt $1
# fi

for FILE in ./client/html/*.html;
do 
  awk '{sub("&lt;","<")}1' $FILE > temp.txt && mv temp.txt $FILE
  awk '{sub("&gt;",">")}1' $FILE > temp.txt && mv temp.txt $FILE
done