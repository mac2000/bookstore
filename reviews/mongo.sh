#!/usr/bin/env bash

docker run -it --rm --name=mongo -p 27017:27017 -e MONGO_INITDB_ROOT_USERNAME=reviews -e MONGO_INITDB_ROOT_PASSWORD=reviews -e MONGO_INITDB_DATABASE=reviews mongo

