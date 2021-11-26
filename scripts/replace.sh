#!/bin/bash

for FILE in ./client/html/*.html;
do 
  awk '{sub("&lt;","<")}1' $FILE > temp.txt && mv temp.txt $FILE
  awk '{sub("&gt;",">")}1' $FILE > temp.txt && mv temp.txt $FILE
done