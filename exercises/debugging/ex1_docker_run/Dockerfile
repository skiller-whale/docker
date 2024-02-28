FROM python:3.10-alpine

WORKDIR /app

COPY requirements.txt ./requirements.txt
RUN pip install -r requirements.txt

COPY src ./src
COPY static ./static
RUN mkdir /app/static/cached

RUN python src/setup_script.py
EXPOSE 8001

CMD ["python", "src/server"]
