# BookStore

Sample Kubernetes application

```mermaid
flowchart TD
    u["fa:fa-user"] --> f
    f["fa:fa-window-maximize frontend:4000 (angular)"] --> b["fa:fa-server books:5001 (dotnet)"]
    f --> r["fa:fa-server reviews:3000 (node)"]
    f --> v["fa:fa-server votes:8080 (go)"]
    subgraph books
    b --> postgres[(fa:fa-database postgres:5432)]
    end
    subgraph reviews
    r --> mongo[(fa:fa-database mongo:27017)]
    end
    subgraph votes
    v --> redis[(fa:fa-database redis:6379)]
    end

    style u fill:transparent,stroke:transparent
    style f fill:#c3002f,stroke:#c3002f,color:#fff
    style b fill:#592c8d,stroke:#592c8d,color:#fff
    style r fill:#7bb740,stroke:#7bb740,color:#fff
    style v fill:#00a7d0,stroke:#00a7d0,color:#fff
    style redis fill:#c12f2c,stroke:#8d2326,color:#fff
    style mongo fill:#10a54e,stroke:#118d4d,color:#fff
    style postgres fill:#31648d,stroke:#000,color:#fff
    style votes fill:transparent,stroke:#000
    style reviews fill:transparent,stroke:#000
    style books fill:transparent,stroke:#000
```


Initially was created to play with OpenTelementry Operator, but may be useful for other experiments in future

> Note: services are ment to be as small as possible and contain some silly mistakes

## Local

Each service has its own docker compose, so may be run in isolation

Also there is global docker compose to run everything at once

For kubernetes there are prepared manifests in kubernetes folder

> Note: there is no tricks around dependencies, so after applying manifests for kubernetes there is a huge chanse you gonna need to restart services that started before databases

## Endpoints

Services are so simple that there is no need to describe each endpoint and it should be easy to determine what endpoins do we have, but just in case here are some common ones used by frontend to retrieve data:

- `http://localhost:5001/v1/books`
- `http://localhost:5001/v1/books/2`
- `http://localhost:3000/v1/books/2/reviews`
- `http://localhost:8080/v1/books/2/votes`

