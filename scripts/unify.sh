#!/bin/bash

echo 'concatenating all ts files into compile.ts'

> uni/compile.ts

cat server/*ts >> uni/compile.ts

echo 'done :)'