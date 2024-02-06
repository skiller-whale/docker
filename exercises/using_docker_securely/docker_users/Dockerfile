FROM python:3.11

RUN pip install flask

RUN mkdir /secrets

# Bad idea! For exercise purposes only. Don't _ever_ do this in production.
RUN echo 'supersecret' > /secrets/secret.txt
RUN chmod -R 400 /secrets

WORKDIR /app
COPY server.py .

CMD python server.py

# GET-ting this returns the secret!
# http://127.0.0.1:5000/getfile?file=../secrets/secret.txt
