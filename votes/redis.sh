#!/usr/bin/env bash

docker run -it --rm --name redis -p 6379:6379 redis:alpine
