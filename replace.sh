#!/bin/bash

# Check the command line argument value exists or not
if [ $1 != "" ]; then
# Search all string based on date
awk '{sub("&lt;","<")}1' $1 > temp.txt && mv temp.txt $1
awk '{sub("&gt;",">")}1' $1 > temp.txt && mv temp.txt $1
fi