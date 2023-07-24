#!/usr/bin/env bash

docker run -it --rm --name=postgres -p 5432:5432 -e POSTGRES_USER=books -e POSTGRES_PASSWORD=books -e POSTGRES_DB=books postgres


