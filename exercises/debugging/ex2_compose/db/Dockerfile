FROM postgres:16-alpine

COPY init.sql /docker-entrypoint-initdb.d/init.sql

# Only for debugging purposes  - Senior Fingineer
ENTRYPOINT sleep 5 && docker-entrypoint.sh postgres
