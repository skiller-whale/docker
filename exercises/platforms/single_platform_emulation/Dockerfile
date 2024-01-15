FROM golang:1.21 AS build
WORKDIR /src
COPY ./main.go main.go

# Build for linux/arm64
ENV GOOS=linux GOARCH=arm64
RUN go build -o /bin/app ./main.go

# Deploy stage
FROM --platform=linux/arm64 alpine:3.14 AS deploy
COPY --from=build /bin/app /bin/app

CMD ["/bin/app"]
