FROM golang:alpine AS builder
WORKDIR /app
COPY go.mod go.sum ./
RUN go mod download
COPY . .
RUN go build -o votes

FROM alpine:latest
WORKDIR /app
COPY --from=builder /app/votes /app/votes
CMD ["/app/votes"]
