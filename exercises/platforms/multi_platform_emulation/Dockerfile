FROM golang:1.21 AS build
WORKDIR /src
COPY ./main.go main.go

RUN go build -o /bin/app ./main.go

# Deploy stage
FROM scratch AS deploy
COPY --from=build /bin/app /bin/app

CMD ["/bin/app"]
