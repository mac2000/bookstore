#!/usr/bin/env bash

export DOCKER_DEFAULT_PLATFORM=linux/amd64

docker build -t mac2000/bookstore-books ./books
docker push mac2000/bookstore-books

docker build -t mac2000/bookstore-reviews ./reviews
docker push mac2000/bookstore-reviews

docker build -t mac2000/bookstore-votes ./votes
docker push mac2000/bookstore-votes

docker build -t mac2000/bookstore-frontend ./frontend
docker push mac2000/bookstore-frontend

