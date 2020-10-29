FROM postgres:13.0

ENV POSTGRES_DB todoapp
ENV POSTGRES_USER test
ENV POSTGRES_PASSWORD test

ADD docker/scripts/init.sql /docker-entrypoint-initdb.d/