FROM python:3.11

RUN pip install flask

RUN mkdir /secrets

WORKDIR /app
COPY server.py .

ENTRYPOINT python server.py
