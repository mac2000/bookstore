#!/usr/bin/env bash


# replaying tutorial:
# https://www.aspecto.io/blog/opentelemetry-operator/

# between steps, wait a bit for pods to get up and running

# create kubernetes cluster
kind create cluster

# wait for cluster to become ready
kubectl wait --for=condition=ready node --all --timeout=90s

# double check that our kubectl is pointing to kind (should see single node)
kubectl get no

# PREREQUISITES

# install cert-manager
kubectl apply -f https://github.com/cert-manager/cert-manager/releases/download/v1.12.0/cert-manager.yaml

# jaeger as backend for traces
kubectl apply -f opentelemetry-operator/jaeger.yml

# kubectl -n opentelemetry port-forward svc/jaeger-all-in-one-ui 16686:16686
# open localhost:16686

# opentelemetry operator
kubectl apply -f https://github.com/open-telemetry/opentelemetry-operator/releases/latest/download/opentelemetry-operator.yaml
# kubectl -n opentelemetry-operator-system get po

kubectl apply -f opentelemetry-operator/gateway.yml
# kubectl -n opentelemetry get OpenTelemetryCollector
# kubectl -n opentelemetry get po

# this two won't create any pods
kubectl apply -f opentelemetry-operator/sidecar.yml
kubectl apply -f opentelemetry-operator/instrumentation.yml
kubectl get instrumentation

kubectl apply -k opentelemetry-operator/kubernetes
kubectl get po
# # right after apply, note that we have init containers - it is opentelemetry injecting itself for autoinstrumentation
# books-548bc49649-mzsv6     0/2     Init:0/1            0          6s
# books-548bc49649-xgl6l     0/2     Init:0/1            0          6s
# frontend-c5f9cd586-n7ccq   0/2     Init:0/1            0          6s
# mongo-0                    0/1     ContainerCreating   0          6s
# postgres-0                 0/1     ContainerCreating   0          6s
# redis-0                    0/1     ContainerCreating   0          6s
# reviews-77d878cfb-tl84s    0/2     Init:0/1            0          6s
# votes-66f5d7cdd4-pc6m6     0/2     ContainerCreating   0          6s

# if needed (aka if some service started before database)
kubectl rollout restart deployment books
kubectl rollout restart deployment reviews
kubectl rollout restart deployment votes


kubectl port-forward svc/books 5001:80
kubectl port-forward svc/reviews 3000:3000
kubectl port-forward svc/votes 8080:8080
kubectl port-forward svc/frontend 4000:4000
kubectl -n opentelemetry port-forward svc/jaeger-all-in-one-ui 16686:16686

open http://localhost:4000
open http://localhost:16686