#!/usr/bin/env bash

kind create cluster
kubectl wait --for=condition=ready node --all --timeout=90s

kubectl apply -k kubernetes

kubectl rollout restart deployment books
kubectl rollout restart deployment votes
# kubectl wait --for=condition=ready pods -l app=frontend --timeout=90s

kubectl port-forward svc/books 5001:80
kubectl port-forward svc/reviews 3000:3000
kubectl port-forward svc/votes 8080:8080
kubectl port-forward svc/frontend 4000:4000

open http://localhost:4000

kind delete cluster